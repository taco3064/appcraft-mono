import type { Credentials } from 'google-auth-library';
import type { Response } from 'express';
import type { Userinfo } from '@appcraft/types';

export type GetAuthURLService = () => Promise<string>;
export type InitialCredentialsService = (code: string) => Promise<Credentials>;
export type RefreshTokenService = () => Promise<Credentials>;
export type RevokeTokenService = (accessToken: string) => Promise<void>;

export type VerifyTokenService = (
  idToken: string,
  res?: Response
) => Promise<Userinfo>;
