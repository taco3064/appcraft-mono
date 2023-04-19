FROM node:16
WORKDIR /app
COPY dist/apps/proxy .
EXPOSE 4001
RUN npm install --production
RUN npm install @appcraft/types reflect-metadata tslib @nestjs/platform-express
CMD node /app/main.js