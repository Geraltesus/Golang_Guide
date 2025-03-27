package usecase

import (
	"errors"
	"time"

	"golang-guide/internal/models"
	"golang-guide/internal/repository"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

type UserUsecase interface {
	Register(username, password, fullName string) error
	Login(username, password string) (string, error)
	GetProfile(userID int64) (*models.User, error)
	Logout(userID int64) error
}

type userUsecase struct {
	userRepo  repository.UserRepository
	jwtSecret string
}

func NewUserUsecase(repo repository.UserRepository, jwtSecret string) UserUsecase {
	return &userUsecase{
		userRepo:  repo,
		jwtSecret: jwtSecret,
	}
}

func (uc *userUsecase) Register(username, password, fullName string) error {
	// Проверка на существование пользователя
	_, err := uc.userRepo.GetUserByUsername(username)
	if err == nil {
		return errors.New("пользователь с таким именем уже существует")
	}
	// Хэширование пароля
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user := &models.User{
		Username:     username,
		PasswordHash: string(hashedPassword),
		CreatedAt:    time.Now(),
		FullName:     fullName,
	}
	return uc.userRepo.CreateUser(user)
}

func (uc *userUsecase) Login(username, password string) (string, error) {
	user, err := uc.userRepo.GetUserByUsername(username)
	if err != nil {
		return "", err
	}
	// Сравнение хэшированного пароля
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return "", errors.New("неверные учётные данные")
	}
	// Генерация JWT токена
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})
	tokenString, err := token.SignedString([]byte(uc.jwtSecret))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func (uc *userUsecase) GetProfile(userID int64) (*models.User, error) {
	return uc.userRepo.GetUserByID(userID)
}

func (uc *userUsecase) Logout(userID int64) error {
	// Простой вариант: ничего не делаем и возвращаем nil.
	return nil
}
