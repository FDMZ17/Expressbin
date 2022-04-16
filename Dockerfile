FROM node:16-alpine

WORKDIR /home/container

COPY package*.json ./

RUN npm install

RUN apk add bash

COPY . .

CMD [ "npm", "start" ]
