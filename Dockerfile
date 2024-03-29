FROM node:16-alpine

WORKDIR /home/container

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
