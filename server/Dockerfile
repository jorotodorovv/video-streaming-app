FROM node:alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./common /app/common
COPY ./server /app/server

WORKDIR /app/server

RUN npm install
RUN npx prisma generate --schema=./db/schema.prisma
RUN npx prisma migrate dev --schema=./db/schema.prisma
RUN npx prisma db seed

EXPOSE 3000

CMD [ "npm", "start" ]