FROM node:16
WORKDIR /app
COPY ../../dist/apps/data-forge .
EXPOSE 4001
RUN npm install --production
RUN npm install reflect-metadata tslib @nestjs/platform-express
CMD node /app/main.js