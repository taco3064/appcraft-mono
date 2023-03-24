import express, { Express } from 'express';
import path from 'path';
import type { Server } from 'http';

import type * as Types from './generate.types';

export default function generate({ port, endpoints, dirname }: Types.Options) {
  const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

  if (dirname) {
    app.use('/assets', express.static(path.join(dirname, 'assets')));
  }

  endpoints.forEach((EndPoint) => new EndPoint(app));

  return [
    app,
    app
      .listen(port)
      .on('error', console.error)
      .on('listening', () => console.log(`Listening at ${port}`)),
  ] as [Express, Server];
}
