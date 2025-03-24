package config

import (
	"log"
	"os"
)

type Config struct {
	DatabaseURL string
	JWTSecret   string
	Port        string
}

func Load() *Config {
	cfg := &Config{
		DatabaseURL: os.Getenv("DATABASE_URL"),
		JWTSecret:   os.Getenv("JWT_SECRET"),
		Port:        os.Getenv("PORT"),
	}
	if cfg.DatabaseURL == "" || cfg.JWTSecret == "" {
		log.Fatal("Не заданы необходимые переменные окружения: DATABASE_URL, JWT_SECRET")
	}
	if cfg.Port == "" {
		cfg.Port = "8888"
	}
	return cfg
}
