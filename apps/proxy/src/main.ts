import { generate } from '@appcraft/server';

import * as endpoints from './endpoints';
import { verifyToken } from './services/GoogleOAuth2';

const [app] = generate(
  process.env.PROXY_SERVER_PORT,
  __dirname,
  Object.values(endpoints)
);

app.use(async (req, res, next) => {
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
});
