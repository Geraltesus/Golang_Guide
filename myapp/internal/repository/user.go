package repository

import (
	"database/sql"
	"golang-guide/internal/models"
)

type UserRepository interface {
	CreateUser(user *models.User) error
	GetUserByUsername(username string) (*models.User, error)
	GetUserByID(id int64) (*models.User, error)
}

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) CreateUser(user *models.User) error {
	query := `INSERT INTO users (username, password_hash, created_at, full_name) 
	          VALUES ($1, $2, $3, $4) RETURNING id`
	err := r.db.QueryRow(query, user.Username, user.PasswordHash, user.CreatedAt, user.FullName).Scan(&user.ID)
	return err
}

func (r *userRepository) GetUserByUsername(username string) (*models.User, error) {
	user := &models.User{}
	query := `SELECT id, username, password_hash, created_at, full_name FROM users WHERE username = $1`
	err := r.db.QueryRow(query, username).Scan(&user.ID, &user.Username, &user.PasswordHash, &user.CreatedAt, &user.FullName)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *userRepository) GetUserByID(id int64) (*models.User, error) {
	user := &models.User{}
	query := `SELECT id, username, password_hash, created_at, full_name FROM users WHERE id = $1`
	err := r.db.QueryRow(query, id).Scan(&user.ID, &user.Username, &user.PasswordHash, &user.CreatedAt, &user.FullName)
	if err != nil {
		return nil, err
	}
	return user, nil
}
