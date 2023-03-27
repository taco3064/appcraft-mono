import { OAuth2Client } from 'google-auth-library';
import { getSecretEnvironments } from '@appcraft/server';

import type * as Types from './google-oauth2.types';

const clientSync = getSecretEnvironments(
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
).then(
  ({ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET }) =>
    new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
);

export const getAuthURL: Types.GetAuthURLService = async () => {
  const client = await clientSync;

  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
};

export const initialCredentials: Types.InitialCredentialsService = async (
  code
) => {
  const client = await clientSync;
  const { tokens } = await client.getToken(code);

  client.setCredentials(tokens);

  return tokens;
};

export const revokeCredentials: Types.RevokeCredentialsService = async () => {
  const client = await clientSync;

  await client.revokeCredentials();
};

export const verifyToken: Types.VerifyTokenService = async (token) => {
  const client = await clientSync;

  const ticket = await client.verifyIdToken({
    idToken: token,
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
};
