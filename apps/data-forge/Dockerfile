FROM node:16
WORKDIR /app
COPY ./dist/apps/data-forge .
ENV PORT=4000
EXPOSE ${PORT}
RUN npm install --production
RUN npm install reflect-metadata tslib @nestjs/platform-express
CMD node ./main.js