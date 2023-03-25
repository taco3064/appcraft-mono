import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { generate } from '@appcraft/server';

import * as endpoints from './endpoints';
import { verifyToken } from './services/google-oauth2';

const [app] = generate({
  port: process.env.SVC_PORT_PROXY,
  endpoints: Object.values(endpoints),
});

app
  .use(async (req, res, next) => {
    if (!req.url.startsWith('/oauth2/')) {
      try {
        const token = req.headers.authorization.split('Bearer ')[1];

        //! 目前只有使用 Google OAuth2, 若未來支援其他登入方式, 此處必須調整
        await verifyToken(token);
      } catch (e) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    next();
  })
  .use(
    '/data-forge',
    createProxyMiddleware({
      target: `http://127.0.0.1:${process.env.SVC_PORT_DATA_FORGE}`,
      changeOrigin: true,
      onProxyReq: fixRequestBody,
      pathRewrite: {
        '^/data-forge': '',
      },
    })
  )
  .use(
    '/ts2-props-conv',
    createProxyMiddleware({
      target: `http://127.0.0.1:${process.env.SVC_PORT_TS2_PROPS_CONV}`,
      changeOrigin: true,
      onProxyReq: fixRequestBody,
      pathRewrite: {
        '^/ts2-props-conv': '',
      },
    })
  );
