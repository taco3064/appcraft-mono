import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

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

    res
      .cookie('token', credentials.id_token, {
        expires: new Date(credentials.expiry_date),
      })
      .redirect('/');
  }
}
