FROM node:20

COPY index.js /index.js
COPY package.json /package.json

RUN npm i

ENTRYPOINT node index.js