package domain

// User представляет доменную сущность пользователя.
type User struct {
	ID           int
	Username     string
	PasswordHash string // Для хранения хеша пароля
}

// UserRepository описывает поведение репозитория пользователей.
type UserRepository interface {
	Create(user *User) (int, error)
	GetByUsername(username string) (*User, error)
	GetByID(id int) (*User, error)
}
