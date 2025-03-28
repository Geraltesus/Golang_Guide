# Этап сборки приложения
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект (по умолчанию Vite создаёт папку dist)
RUN npm run build

# Этап для продакшена: используем легковесный сервер nginx
FROM nginx:stable-alpine

# Копируем собранные файлы в папку, которую обслуживает nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80 для доступа к приложению
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
