import jwt from 'jsonwebtoken';

import { clients } from '../common';
import type * as Types from './google-oauth2.types';

export const getAuthURL: Types.GetAuthURLService = async (mode) => {
  const { [mode]: client } = clients;

  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
};

export const initialCredentials: Types.InitialCredentialsService = async (
  mode,
  code
) => {
  const { [mode]: client } = clients;
  const { tokens } = await client.getToken(code);

  client.setCredentials(tokens);

  return tokens;
};

export const revokeToken: Types.RevokeTokenService = async (
  mode,
  accessToken
) => {
  const { [mode]: client } = clients;

  return client.revokeToken(accessToken);
};

export const verifyToken: Types.VerifyTokenService = async (
  mode,
  idToken,
  res
) => {
  const { [mode]: client } = clients;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: __WEBPACK_DEFINE__.GOOGLE_CLIENT_ID,
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

    return verifyToken(mode, credentials.id_token);
  }
};
