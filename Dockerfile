# build environment
FROM node:latest as build
# default env_file
ARG ENV_FILE=".env.local"
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . .
COPY .env /app/.env
COPY ${ENV_FILE} /app/.env.local
RUN yarn build
# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000 80
CMD ["nginx", "-g", "daemon off;"]
