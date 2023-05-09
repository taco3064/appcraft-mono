import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

import type * as Types from './google-oauth2.types';

const client = new OAuth2Client(
  __WEBPACK_DEFINE__.GOOGLE_CLIENT_ID,
  __WEBPACK_DEFINE__.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getAuthURL: Types.GetAuthURLService = async () => {
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
};

export const initialCredentials: Types.InitialCredentialsService = async (
  code
) => {
  const { tokens } = await client.getToken(code);

  client.setCredentials(tokens);

  return tokens;
};

export const revokeToken: Types.RevokeTokenService = async (accessToken) => {
  await client.revokeToken(accessToken);
};

export const verifyToken: Types.VerifyTokenService = async (idToken, res) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
      id: payload.sub,
      username: payload.name,
      email: payload.email,
      picture: payload.picture,
      expires: payload.exp,
    };
  } catch (e) {
    const { credentials } = await client.refreshAccessToken();
    const cookieOpts = { expires: new Date(credentials.expiry_date) };

    client.setCredentials(credentials);

    res
      ?.cookie(
        'id',
        jwt.sign(credentials.id_token, __WEBPACK_DEFINE__.JWT_SECRET),
        cookieOpts
      )
      .cookie(
        'access',
        jwt.sign(credentials.access_token, __WEBPACK_DEFINE__.JWT_SECRET),
        cookieOpts
      );

    return await verifyToken(credentials.id_token);
  }
};
