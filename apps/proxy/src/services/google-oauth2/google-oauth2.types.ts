import type { Credentials } from 'google-auth-library';
import type { Response } from 'express';
import type { Userinfo } from '@appcraft/types';

import type { OAuth2ClientMode } from '../common';

export type GetAuthURLService = (mode: OAuth2ClientMode) => Promise<string>;

export type InitialCredentialsService = (
  mode: OAuth2ClientMode,
  code: string
) => Promise<Credentials>;

export type RefreshTokenService = (
  mode: OAuth2ClientMode
) => Promise<Credentials>;

export type RevokeTokenService = (
  mode: OAuth2ClientMode,
  accessToken: string
) => Promise<unknown>;

export type VerifyTokenService = (
  mode: OAuth2ClientMode,
  idToken: string,
  res?: Response
) => Promise<Userinfo>;
