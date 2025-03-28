# Этап сборки
FROM node:20-alpine AS builder

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package.json pnpm-lock.yaml ./

# Установка зависимостей
RUN pnpm install --frozen-lockfile

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN pnpm build

# Этап production
FROM nginx:alpine

# Копирование собранных файлов из этапа сборки
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открытие порта
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"] 