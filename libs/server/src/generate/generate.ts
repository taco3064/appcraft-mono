import express, { Express } from 'express';
import path from 'path';
import type { Server } from 'http';

import { DefaultImplement } from '../decorators';

export default function generate(
  port,
  endpoints: DefaultImplement[],
  dirname?: string
) {
  const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

  if (dirname) {
    app.use('/assets', express.static(path.join(dirname, 'assets')));
  }

  Object.values(endpoints).forEach((EndPoint: DefaultImplement) => {
    new EndPoint(app);
  });

  return [
    app,
    app
      .listen(port)
      .on('error', console.error)
      .on('listening', () => console.log(`Listening at ${port}`)),
  ] as [Express, Server];
}
