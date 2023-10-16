import jwt from 'jsonwebtoken';
import { Module, Endpoint } from '@appcraft/server';
import type { Request, Response } from 'express';

import * as googleOauth2 from '~proxy/services/google-oauth2';
import type { OAuth2ClientMode } from '~proxy/services/common';

@Module({ base: 'oauth2' })
export default class OAuth2 {
  private static getAuthMode(req: Request): OAuth2ClientMode {
    return req.hostname === 'localhost' ? 'dev' : 'prod';
  }

  @Endpoint({
    method: 'get',
    description: '跳轉至 Google 登入畫面',
  })
  async google(req: Request, res: Response) {
    res.redirect(await googleOauth2.getAuthURL(OAuth2.getAuthMode(req)));
  }

  @Endpoint({
    url: 'google/callback',
    method: 'get',
    description: '初始化登入',
  })
  async callback4Google(req: Request, res: Response) {
    const { code } = req.query as { code: string };
    const mode = OAuth2.getAuthMode(req);
    const credentials = await googleOauth2.initialCredentials(mode, code);
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
    const mode = OAuth2.getAuthMode(req);

    const accessToken = jwt.verify(
      req.query.access as string,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as string;

    //! 目前只有使用 Google OAuth2, 若未來支援其他登入方式, 此處必須調整
    await googleOauth2.revokeToken(mode, accessToken);

    res.clearCookie('access').clearCookie('id').redirect('/');
  }
}
