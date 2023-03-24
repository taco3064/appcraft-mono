import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { generate } from '@appcraft/server';

import * as endpoints from './endpoints';
import { verifyToken } from './services/GoogleOAuth2';

const [app] = generate(process.env.SVC_PORT_PROXY, Object.values(endpoints));

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
  .use((req, res, next) => {
    try {
      const [, service] = req.url.split('/');
      const upper = service.toUpperCase().replace(/\-/g, '_');

      const middleware = createProxyMiddleware({
        target: `http://127.0.0.1:${process.env[`SVC_PORT_${upper}`]}`,
        changeOrigin: true,
        onProxyReq: fixRequestBody,
        pathRewrite: {
          [`^/${service}`]: '',
        },
      });

      middleware(req, res, next);
    } catch (e) {
      return res.status(502).json({ error: 'Bad Gateway' });
    }
  });
