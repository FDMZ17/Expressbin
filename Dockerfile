FROM node:16-alpine

WORKDIR /home/container

COPY package*.json ./

RUN npm install

RUN apk install bash

COPY . .

COPY ./entrypoints.sh /entrypoints.sh

CMD [ "/bin/sh", "/entrypoints.sh" ]
