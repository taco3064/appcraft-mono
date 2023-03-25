import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { generate } from '@appcraft/server';
import type { Options } from 'http-proxy-middleware';

import * as endpoints from './endpoints';

const [app] = generate({
  port: process.env.SVC_PORT_PROXY,
  endpoints: Object.values(endpoints),
  ignoreAuth: [/^\/oauth2\//],
});

const handleProxyReq: Options['onProxyReq'] = (proxyReq, req) => {
  const token = req.headers.authorization.split('Bearer ')[1];

  proxyReq.setHeader('authorization', `Bearer ${token}`);
  fixRequestBody(proxyReq, req);
};

app
  .use(
    '/data-forge',
    createProxyMiddleware({
      target: `http://127.0.0.1:${process.env.SVC_PORT_DATA_FORGE}`,
      changeOrigin: true,
      onProxyReq: handleProxyReq,
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
      onProxyReq: handleProxyReq,
      pathRewrite: {
        '^/ts2-props-conv': '',
      },
    })
  );
