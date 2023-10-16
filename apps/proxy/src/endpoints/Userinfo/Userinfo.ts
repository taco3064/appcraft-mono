import jwt from 'jsonwebtoken';
import { Module, Endpoint } from '@appcraft/server';
import { Request, Response } from 'express';

import * as googleOauth2 from '~proxy/services/google-oauth2';

@Module({ base: 'userinfo' })
export default class Userinfo {
  @Endpoint({
    method: 'get',
    description: '取得使用者資訊',
  })
  async profile(req: Request, res: Response) {
    const idToken = jwt.verify(
      req.cookies.id,
      __WEBPACK_DEFINE__.JWT_SECRET
    ) as string;

    //! 目前只有使用 Google OAuth2, 若未來支援其他登入方式, 此處必須調整
    res.json(await googleOauth2.verifyToken(idToken, res));
  }
}
