FROM node:18-alpine as angular-build
WORKDIR /app
COPY angular/package*.json ./
RUN npm install -ci --quiet
COPY ./angular/. ./
RUN npm run build --omit=dev

FROM squidfunk/mkdocs-material as docs-build
WORKDIR /docs
COPY ./docs ./
RUN mkdocs build

FROM nginx:1.20.1
COPY --from=angular-build /app/dist/app /usr/share/nginx/html/angular
COPY --from=docs-build /docs/site /usr/share/nginx/html/docs
COPY ./static /usr/share/nginx/static
# The dev version of this file is in the devops directory
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80