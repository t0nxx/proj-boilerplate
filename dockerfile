FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .
EXPOSE 3000

ENTRYPOINT [ "npm", "run","start:prod" ]
#ENTRYPOINT [ "npm", "run","start:dev" ]


