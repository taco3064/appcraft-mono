import express from 'express';
import path from 'path';

import { DefaultImplement } from './decorators';
import * as endpoints from './endpoints';

const port = process.env.PORT || 3068;

const app = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/assets', express.static(path.join(__dirname, 'assets')));

Object.values(endpoints).forEach((EndPoint: DefaultImplement) => {
  new EndPoint(app);
});

app
  .listen(port)
  .on('error', console.error)
  .on('listening', () => console.log(`Listening at http://localhost:${port}`));
