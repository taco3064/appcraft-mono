import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

import * as GoogleOAuth2Service from '~proxy/services/GoogleOAuth2';

@Module({ base: 'oauth2' })
export default class OAuth2 {
  @Endpoint({
    method: 'get',
    description: '跳轉至 Google 登入畫面',
  })
  google(_req: Request, res: Response) {
    res.redirect(GoogleOAuth2Service.getAuthURL());
  }

  @Endpoint({
    url: 'google/callback',
    method: 'get',
    description: '初始化登入',
  })
  async callback4Google(req: Request, res: Response) {
    const { code } = req.query as { code: string };
    const credentials = await GoogleOAuth2Service.initialCredentials(code);

    res
      .cookie('token', credentials.id_token, {
        expires: new Date(credentials.expiry_date),
      })
      .redirect('/');
  }
}
