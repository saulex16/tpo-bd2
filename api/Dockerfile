FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

RUN apk --update add postgresql-client
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories && apk add mongodb-tools
RUN npm install
RUN npx prisma generate
RUN chmod u+x ./migrate.sh