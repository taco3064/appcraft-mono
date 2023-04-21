import cookieParser from 'cookie-parser';
import express from 'express';
import type { DefaultImplement } from '@appcraft/server';

import * as endpoints from './endpoints';

const port = process.env.SERVICE_TS2_PROPS.replace(/^.+:/, '');

const app = express()
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

Object.values(endpoints).forEach(
  (EndPoint: DefaultImplement) => new EndPoint(app)
);

app
  .get('/', (_req, res) =>
    res
      .setHeader('Content-type', 'text/html')
      .send(
        `<h1>@appcraft/ts2-props:${port}<br/>version: ${__WEBPACK_DEFINE__.VERSION}</h1>`
      )
  )
  .listen(port)
  .on('error', console.error)
  .on('listening', () => console.log(`Listening at ${port}`));
