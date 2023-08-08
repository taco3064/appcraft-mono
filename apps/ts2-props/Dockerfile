FROM node:16
WORKDIR /app
COPY dist/apps/ts2-props .
COPY dist/libs/types ./libs/types
COPY dist/libs/mui ./libs/mui
EXPOSE 4001
RUN npm install --production
RUN npm install react@18.2.0 @types/react@18.2.6 @mui/material@5.13.1 -D
RUN npm install file:/app/libs/types file:/app/libs/mui -D
RUN npm install reflect-metadata tslib @nestjs/platform-express
CMD node /app/main.js