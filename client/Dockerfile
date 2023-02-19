FROM node:alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./routes.config.json /app/routes.config.json
COPY ./client /app/client

WORKDIR /app/client

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/client/dist /usr/share/nginx/html

# needed this to make React Router work properly
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/client/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]