import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

import * as GoogleOAuth2Service from '~proxy/services/google-oauth2';
import type * as Types from './Userinfo.types';

@Module({ base: 'userinfo' })
export default class Userinfo {
  @Endpoint({
    method: 'get',
    description: '取得使用者資訊',
  })
  async profile(req: Request, res: Response) {
    //! 目前只有使用 Google OAuth2, 若未來支援其他登入方式, 此處必須調整
    res.json(
      await GoogleOAuth2Service.verifyToken(
        req.headers.authorization.split('Bearer ')[1]
      )
    );
  }

  @Endpoint({
    method: 'get',
    description: '登出',
  })
  async signout(req: Request, res: Response) {
    //! 目前只有使用 Google OAuth2, 若未來支援其他登入方式, 此處必須調整
    await GoogleOAuth2Service.revokeCredentials();

    res.clearCookie('token').redirect('/');
  }
}
