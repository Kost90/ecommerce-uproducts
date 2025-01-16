FROM node:22.11.0

WORKDIR /ecommerce/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
