package http

import (
	"net/http"
	"strconv"
	"strings"

	"golang-guide/internal/usecase"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	userUsecase usecase.UserUsecase
}

func NewHandler(uu usecase.UserUsecase) *Handler {
	return &Handler{
		userUsecase: uu,
	}
}

// Register – регистрация пользователя
func (h *Handler) Register(c *gin.Context) {
	var input struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
		FullName string `json:"full_name" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.userUsecase.Register(input.Username, input.Password, input.FullName)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "пользователь успешно зарегистрирован"})
}

// Login – аутентификация пользователя
func (h *Handler) Login(c *gin.Context) {
	var input struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	token, err := h.userUsecase.Login(input.Username, input.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "неверные учётные данные"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})
}

// Profile – получение информации о текущем пользователе
func (h *Handler) Profile(c *gin.Context) {
	// Извлечение идентификатора пользователя из контекста (установлено в middleware)
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	uid, ok := userID.(int64)
	if !ok {
		// Если userID хранится как float64 (JWT может декодировать числа как float64)
		if f, ok := userID.(float64); ok {
			uid = int64(f)
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}
	}
	user, err := h.userUsecase.GetProfile(uid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "не удалось получить данные профиля"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"username":  user.Username,
		"full_name": user.FullName,
	})
}

// AuthMiddleware – middleware для проверки JWT токена и извлечения user_id
func AuthMiddleware(jwtSecret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "необходим заголовок авторизации"})
			return
		}
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "некорректный заголовок авторизации"})
			return
		}
		tokenString := parts[1]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrInvalidKey
			}
			return []byte(jwtSecret), nil
		})
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "некорректный токен"})
			return
		}
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "некорректные данные токена"})
			return
		}
		userID, ok := claims["user_id"]
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "user_id не найден в токене"})
			return
		}
		// Сохранение userID в контексте
		switch id := userID.(type) {
		case float64:
			c.Set("userID", int64(id))
		case int64:
			c.Set("userID", id)
		case string:
			uid, err := strconv.ParseInt(id, 10, 64)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "некорректный user_id в токене"})
				return
			}
			c.Set("userID", uid)
		default:
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "некорректный тип user_id в токене"})
			return
		}
		c.Next()
	}
}

// Logout – обработчик для выхода пользователя
func (h *Handler) Logout(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	var uid int64
	switch id := userID.(type) {
	case float64:
		uid = int64(id)
	case int64:
		uid = id
	case string:
		var err error
		uid, err = strconv.ParseInt(id, 10, 64)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "некорректный user_id в токене"})
			return
		}
	default:
		c.JSON(http.StatusUnauthorized, gin.H{"error": "некорректный тип user_id в токене"})
		return
	}

	// В данном случае просто вызываем usecase.Logout, который ничего не делает
	if err := h.userUsecase.Logout(uid); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "не удалось выйти"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "вы успешно вышли из системы"})
}
