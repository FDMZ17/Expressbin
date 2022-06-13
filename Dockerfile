FROM node:16-alpine

WORKDIR /home/container

COPY package*.json ./

RUN npm install

COPY . .

COPY ./run.sh /run.sh

CMD [ "/bin/bash", "/run.sh" ]

CMD [ "npm", "start" ]
