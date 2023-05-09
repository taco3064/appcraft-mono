import jwt from 'jsonwebtoken';
import { Module, Endpoint } from '@appcraft/server';
import type { Request, Response } from 'express';

import * as googleOauth2 from '~proxy/services/google-oauth2';

@Module({ base: 'oauth2' })
export default class OAuth2 {
  @Endpoint({
    method: 'get',
    description: '跳轉至 Google 登入畫面',
  })
  async google(_req: Request, res: Response) {
    res.redirect(await googleOauth2.getAuthURL());
  }

  @Endpoint({
    url: 'google/callback',
    method: 'get',
    description: '初始化登入',
  })
  async callback4Google(req: Request, res: Response) {
    const { code } = req.query as { code: string };
    const credentials = await googleOauth2.initialCredentials(code);
    const cookieOpts = { expires: new Date(credentials.expiry_date) };

    res
      .cookie(
        'id',
        jwt.sign(credentials.id_token, __WEBPACK_DEFINE__.JWT_SECRET),
        cookieOpts
      )
      .cookie(
        'access',
        jwt.sign(credentials.access_token, __WEBPACK_DEFINE__.JWT_SECRET),
        cookieOpts
      )
      .redirect('/');
  }

  @Endpoint({
    method: 'get',
    description: '登出',
  })
  async signout(req: Request, res: Response) {
    const accessToken = jwt.verify(
      req.query.access as string,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as string;

    //! 目前只有使用 Google OAuth2, 若未來支援其他登入方式, 此處必須調整
    await googleOauth2.revokeToken(accessToken);

    res.clearCookie('access').clearCookie('id').redirect('/');
  }
}
