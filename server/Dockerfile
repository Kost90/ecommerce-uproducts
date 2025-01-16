# FROM node:22.11.0

# WORKDIR /ecommerce/src

# COPY package*.json ./

# RUN npm install

# COPY . .

# COPY .env .

# RUN npm run build

# EXPOSE 3001

# CMD ["npm", "run", "start"]

# Используем базовый образ с Node.js
FROM node:22.11.0

# Устанавливаем рабочую директорию внутри контейнера на /ecommerce/src
WORKDIR /ecommerce/src

# Копируем только package.json и package-lock.json в рабочую директорию
COPY ../package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY ../ ./

# Копируем .env файл (если он нужен)
COPY ../.env ./

# Выполняем сборку проекта (если необходимо)
RUN npm run build

# Открываем порт 3001 для приложения
EXPOSE 3001

# Запускаем приложение
CMD ["npm", "run", "start"]