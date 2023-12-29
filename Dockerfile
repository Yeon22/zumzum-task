FROM node:20-buster

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

ENV HOST 0.0.0.0

EXPOSE 3000

EXPOSE 9000

CMD ["pnpm", "run", "start:dev"]