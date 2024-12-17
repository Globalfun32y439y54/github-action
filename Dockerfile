FROM node:16

WORKDIR /github/workspace

COPY package*.json ./

RUN npm install

COPY index.js ./

RUN npm run build

ENTRYPOINT ["node", "index.js"]
