import { Module, Endpoint } from '@appcraft/server';
import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

@Module({ base: 'oauth2/google' })
export default class OAuth {
  @Endpoint({
    method: 'get',
    description: '跳轉至 Google 登入畫面',
  })
  login(_req: Request, res: Response) {
    res.redirect(
      client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
      })
    );
  }

  @Endpoint({
    method: 'get',
    description: '初始化登入',
  })
  async callback(req: Request, res: Response) {
    const { code } = req.query as { code: string };
    const { tokens } = await client.getToken(code);

    client.setCredentials(tokens);

    res
      .cookie('token', tokens.id_token, {
        expires: new Date(tokens.expiry_date),
      })
      .redirect('/');
  }
}