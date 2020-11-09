
FROM node:12.16.0-buster

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 9000

CMD [ "node", "server.js" ]
