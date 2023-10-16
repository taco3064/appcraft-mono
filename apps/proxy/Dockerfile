FROM node:18
WORKDIR /app
COPY dist/apps/proxy .
RUN npm install --production
RUN npm install reflect-metadata tslib @nestjs/platform-express
CMD node /app/main.js
EXPOSE 4000