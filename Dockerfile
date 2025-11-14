# build environment
FROM node:22-alpine as build
# default env files
ARG ENV_LOCAL=".env.local"
ARG ENV_PRODUCTION_LOCAL=".env.production.local"
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . .
COPY .env /app/.env
COPY ${ENV_LOCAL} /app/.env.local
COPY ${ENV_PRODUCTION_LOCAL} /app/.env.production.local
RUN yarn build
# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000 80
CMD ["nginx", "-g", "daemon off;"]
