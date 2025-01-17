FROM node:22.11.0

WORKDIR /ecommerce

COPY . .

COPY package*.json ./

RUN npm install

RUN ls -l /ecommerce/src/controllers

RUN npx prisma generate

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
