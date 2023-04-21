FROM node:16
WORKDIR /app
COPY dist/apps/ts2-props .
EXPOSE 4001
RUN npm install --production
RUN npm install react @types/react @appcraft/types @mui/material @mui/icons-material @emotion/react @emotion/styled tss-react -D
RUN npm install reflect-metadata tslib @nestjs/platform-express
CMD node /app/main.js