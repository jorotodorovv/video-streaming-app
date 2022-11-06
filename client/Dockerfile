FROM node:alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app

RUN npm install

COPY . /app

RUN npm run build:client

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# needed this to make React Router work properly
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]