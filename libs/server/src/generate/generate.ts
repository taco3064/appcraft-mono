import express, { Express } from 'express';
import path from 'path';
import type { Server } from 'http';

import type * as Types from './generate.types';
import { verifyToken } from '~proxy/services/google-oauth2';

export default function generate({
  port,
  endpoints,
  dirname,
  ignoreAuth = [],
}: Types.Options) {
  const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(async (req, res, next) => {
      if (ignoreAuth.every((ignored) => !ignored.test(req.url))) {
        try {
          const token = req.headers.authorization.split('Bearer ')[1];

          req.user = await verifyToken(token);
        } catch (e) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
      }

      next();
    });

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
