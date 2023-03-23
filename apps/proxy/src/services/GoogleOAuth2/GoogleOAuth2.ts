import { OAuth2Client } from 'google-auth-library';
import type * as Types from './GoogleOAuth2.types';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getAuthURL: Types.GetAuthURL = () =>
  client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
  });

export const initialCredentials: Types.InitialCredentials = async (
  code: string
) => {
  const { tokens } = await client.getToken(code);

  client.setCredentials(tokens);

  return tokens;
};

export const verifyToken: Types.VerifyToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  return ticket.getPayload();
};
