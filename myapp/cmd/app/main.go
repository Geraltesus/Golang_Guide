package main

import (
	"database/sql"
	"log"
	"time"

	"golang-guide/internal/config"
	httpDelivery "golang-guide/internal/delivery/http"
	"golang-guide/internal/repository"
	"golang-guide/internal/usecase"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	// Загрузка конфигурации
	cfg := config.Load()

	// Подключение к базе данных PostgreSQL
	db, err := sql.Open("postgres", cfg.DatabaseURL)
	if err != nil {
		log.Fatal("Ошибка подключения к БД:", err)
	}
	defer db.Close()

	// Инициализация репозитория, usecase и HTTP-обработчика
	userRepo := repository.NewUserRepository(db)
	userUC := usecase.NewUserUsecase(userRepo, cfg.JWTSecret)
	handler := httpDelivery.NewHandler(userUC)

	// Инициализация Gin
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Публичные маршруты
	router.POST("/signup", handler.Register)
	router.POST("/login", handler.Login)

	// Защищённые маршруты (JWT middleware)
	protected := router.Group("/")
	protected.Use(httpDelivery.AuthMiddleware(cfg.JWTSecret))
	protected.GET("/profile", handler.Profile)
	protected.POST("/logout", handler.Logout)

	log.Println("Сервер запущен на порту", cfg.Port)
	router.Run(":" + cfg.Port)
}
