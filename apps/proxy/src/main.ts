import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import type { DefaultImplement } from '@appcraft/server';

import { verifyToken } from '~proxy/services/google-oauth2';
import * as endpoints from './endpoints';

const port = process.env.SERVICE_PROXY.replace(/^.+\:/, '');

const app = express()
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use(async (req, res, next) => {
    if (!/^\/oauth2\//.test(req.url)) {
      try {
        const token = req.headers.authorization.split('Bearer ')[1];
        const { expires: expiresIn, ...user } = await verifyToken(token);
        const expires = new Date(new Date().valueOf() + expiresIn);

        res.cookie(
          'jwt',
          jwt.sign(user, __WEBPACK_DEFINE__.JWT_SECRET, { expiresIn }),
          {
            expires,
            httpOnly: true,
          }
        );
      } catch (e) {
        console.error(e);
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    next();
  })
  .use(
    '/data-forge',
    createProxyMiddleware({
      target: process.env.SERVICE_DATA_FORGE,
      changeOrigin: true,
      onProxyReq: fixRequestBody,
      pathRewrite: {
        '^/data-forge': '',
      },
    })
  )
  .use(
    '/ts2-props',
    createProxyMiddleware({
      target: process.env.SERVICE_TS2_PROPS,
      changeOrigin: true,
      onProxyReq: fixRequestBody,
      pathRewrite: {
        '^/ts2-props': '',
      },
    })
  );

Object.values(endpoints).forEach(
  (EndPoint: DefaultImplement) => new EndPoint(app)
);

app
  .listen(port)
  .on('error', console.error)
  .on('listening', () => console.log(`Listening at ${port}`));
