package usecase

import (
	"errors"
	domain "golang-guide/internal/entities"

	"golang.org/x/crypto/bcrypt"
)

type UserUsecase interface {
	Register(username, password string) (int, error)
	Login(username, password string) (*domain.User, error)
}

type userUsecase struct {
	userRepo domain.UserRepository
}

func NewUserUsecase(repo domain.UserRepository) UserUsecase {
	return &userUsecase{userRepo: repo}
}

func (u *userUsecase) Register(username, password string) (int, error) {
	// Проверяем наличие пользователя
	existing, err := u.userRepo.GetByUsername(username)
	if err != nil {
		return 0, err
	}
	if existing != nil {
		return 0, errors.New("пользователь уже существует")
	}

	// Хеширование пароля
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}

	user := &domain.User{
		Username:     username,
		PasswordHash: string(hash),
	}

	return u.userRepo.Create(user)
}

func (u *userUsecase) Login(username, password string) (*domain.User, error) {
	user, err := u.userRepo.GetByUsername(username)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("пользователь не найден")
	}
	// Проверка пароля
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		return nil, errors.New("неверный пароль")
	}
	return user, nil
}
