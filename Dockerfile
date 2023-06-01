FROM node:latest
WORKDIR /src/usr/app
COPY . .
EXPOSE 3000
CMD npm run dev