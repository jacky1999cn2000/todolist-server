FROM node:5
MAINTAINER <Liang Zhao> liang.zhao83@gmail.com

ENV PORT 3000
EXPOSE 3000

COPY . /usr/src/app

WORKDIR /usr/src/app

ENTRYPOINT /usr/src/app/node_modules/.bin/forever app.js --prod
