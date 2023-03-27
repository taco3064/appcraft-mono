import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { generate } from '@appcraft/server';

import { verifyToken } from '~proxy/services/google-oauth2';
import * as endpoints from './endpoints';

const [app] = generate({
  port: process.env.PORT_PROXY,
  endpoints: Object.values(endpoints),
});

app
  .use(async (req, res, next) => {
    if (!/^\/oauth2\//.test(req.url)) {
      try {
        const token = req.headers.authorization.split('Bearer ')[1];
        const { expires: expiresIn, ...user } = await verifyToken(token);
        const expires = new Date(new Date().valueOf() + expiresIn);
        const secretKey = crypto.randomBytes(32).toString();

        res
          .cookie('jwt', jwt.sign(user, secretKey, { expiresIn }), {
            expires,
            httpOnly: true,
          })
          .cookie('secret', secretKey, { expires, httpOnly: true });
      } catch (e) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    next();
  })
  .use(
    '/data-forge',
    createProxyMiddleware({
      target: `http://127.0.0.1:${process.env.PORT_DATA_FORGE}`,
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
      target: `http://127.0.0.1:${process.env.PORT_TS2_PROPS}`,
      changeOrigin: true,
      onProxyReq: fixRequestBody,
      pathRewrite: {
        '^/ts2-props': '',
      },
    })
  );
