FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY index.js ./

RUN npm install

CMD ["node", "index.js"]
