FROM node:16
WORKDIR /app
COPY dist/apps/ts2-props .
COPY dist/libs/types ./libs/types
EXPOSE 4001
RUN npm install --production
RUN npm install file:/app/libs/types -D
RUN npm install react@18.2.0 @types/react@18.0.28 @mui/material@5.13.1 @emotion/react@11.11.0 @emotion/styled@11.11.0 -D
RUN npm install reflect-metadata tslib @nestjs/platform-express
CMD node /app/main.js