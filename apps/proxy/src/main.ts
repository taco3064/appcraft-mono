import cookieParser from 'cookie-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import type { DefaultImplement } from '@appcraft/server';

import { getClientMode } from '~proxy/services/common';
import { verifyToken } from '~proxy/services/google-oauth2';
import * as endpoints from './endpoints';

const port = __WEBPACK_DEFINE__.EXPOSES.PROXY;

const whitelist = [
  /^\/$/,
  /^\/oauth2\//,
  /^\/data-forge\/website-token\/config\//,
  /^\/data-forge\/config\/find\//,
];

const app = express()
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use(async (req, res, next) => {
    if (!whitelist.some((reg) => reg.test(req.url))) {
      try {
        const mode = getClientMode(req.hostname);

        const idToken = jwt.verify(
          req.cookies.id,
          __WEBPACK_DEFINE__.JWT_SECRET
        ) as string;

        const { expires: expiresIn, ...user } = await verifyToken(
          mode,
          idToken,
          res
        );
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
      target: `http://127.0.0.1:${__WEBPACK_DEFINE__.EXPOSES.DATA_FORGE}`,
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
      target: `http://127.0.0.1:${__WEBPACK_DEFINE__.EXPOSES.TS2_PROPS}`,
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
  .get('/', (_req, res) =>
    res
      .setHeader('Content-type', 'text/html')
      .send(
        `<h1>@appcraft/proxy:${port}<br/>v${__WEBPACK_DEFINE__.VERSION}</h1>`
      )
  )
  .listen(port)
  .on('error', console.error)
  .on('listening', () => console.log(`Listening at ${port}`));
