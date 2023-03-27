import type { Credentials, TokenPayload } from 'google-auth-library';

export type GetAuthURLService = () => Promise<string>;
export type InitialCredentialsService = (code: string) => Promise<Credentials>;
export type RevokeCredentialsService = () => Promise<void>;

export type VerifyTokenService = (token: string) => Promise<{
  id: string;
  username: string;
  email: string;
  picture: string;
}>;
