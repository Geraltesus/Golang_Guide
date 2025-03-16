package repository

import (
	"database/sql"
	domain "golang-guide/internal/entities"
)

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) domain.UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) Create(user *domain.User) (int, error) {
	var id int
	err := r.db.QueryRow(
		"INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id",
		user.Username, user.PasswordHash,
	).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

func (r *userRepository) GetByUsername(username string) (*domain.User, error) {
	var user domain.User
	err := r.db.QueryRow("SELECT id, username, password_hash FROM users WHERE username=$1", username).
		Scan(&user.ID, &user.Username, &user.PasswordHash)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) GetByID(id int) (*domain.User, error) {
	var user domain.User
	err := r.db.QueryRow("SELECT id, username, password_hash FROM users WHERE id=$1", id).
		Scan(&user.ID, &user.Username, &user.PasswordHash)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &user, nil
}
