import type { Credentials, TokenPayload } from 'google-auth-library';

interface Authorization {
  token: string;
  userid: string;
  username: string;
  email: string;
  picture: string;
}

export type GetAuthURL = () => string;
export type InitialCredentials = (code: string) => Promise<Credentials>;
export type VerifyToken = (token: string) => Promise<TokenPayload>;
