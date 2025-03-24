package main

import (
	"database/sql"
	"golang-guide/internal/config"
	httpDelivery "golang-guide/internal/delivery/http"
	"golang-guide/internal/repository"
	"golang-guide/internal/usecase"
	"log"
	"time"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Connect to PostgreSQL database
	db, err := sql.Open("postgres", cfg.DatabaseURL)
	if err != nil {
		log.Fatal("Database connection error:", err)
	}
	defer db.Close()

	// Initialize repository, usecase and HTTP handler
	userRepo := repository.NewUserRepository(db)
	userUC := usecase.NewUserUsecase(userRepo)
	handler := httpDelivery.NewHandler(userUC)

	// Initialize Gin
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Разрешить фронтенд
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Public routes
	router.POST("/signup", handler.Register)
	router.POST("/login", handler.Login)

	// Protected routes with JWT middleware
	protected := router.Group("/")
	protected.Use(httpDelivery.AuthMiddleware())
	protected.GET("/profile", handler.Profile)

	// Start server
	log.Println("Server is running on port", cfg.Port)
	router.Run(":" + cfg.Port)
}
