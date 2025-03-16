package http

import (
	"net/http"
	"os"
	"time"

	"golang-guide/internal/usecase"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

type Handler struct {
	userUsecase usecase.UserUsecase
}

func NewHandler(u usecase.UserUsecase) *Handler {
	return &Handler{userUsecase: u}
}

// Register обрабатывает регистрацию нового пользователя.
func (h *Handler) Register(c *gin.Context) {
	var input struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат данных"})
		return
	}

	id, err := h.userUsecase.Register(input.Username, input.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user_id": id})
}

// Login выполняет аутентификацию и возвращает JWT.
func (h *Handler) Login(c *gin.Context) {
	var input struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат данных"})
		return
	}

	user, err := h.userUsecase.Login(input.Username, input.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	// Генерация JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(72 * time.Hour).Unix(),
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка генерации токена"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// Profile – пример защищённого маршрута.
func (h *Handler) Profile(c *gin.Context) {
	// Значение user_id устанавливается в middleware
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Доступ запрещён"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user_id": userID})
}
