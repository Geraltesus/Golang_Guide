# Golang_Guide

https://docs.docker.com/get-started/get-docker/ - ссылка на документацию для скачавания docker и docker-compose

Для запуска выолните команду в терминале находясь в корневой папке проекта: 

```
docker compose up --build -d
```

-d запустить в фоновом режиме

http://localhpst:3000/ - после запуска докера можно зайти на по этой ссылке

для запуска у себя на сервере, создайте файл .env и заполните данные вместо звездочек

```
DATABASE_URL=postgres://postgres:postgres@db:5432/postgres?sslmode=disable
JWT_SECRET=your_secret_key
PORT=****

# Данные для подключения к базе данных
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
HOST_DB_PORT=****
APP_PORT=****
```

Также в файле ./nginx/conf.d/default.conf поставьте соответствующий ip адрес