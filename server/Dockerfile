FROM node:22.11.0

WORKDIR /ecommerce/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]