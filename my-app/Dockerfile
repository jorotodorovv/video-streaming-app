FROM node:alpine as build

WORKDIR /app

# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/

# install dependencies
RUN npm install

# copy everything to /app directory
COPY . /app

# build the app 
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# needed this to make React Router work properly 
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]