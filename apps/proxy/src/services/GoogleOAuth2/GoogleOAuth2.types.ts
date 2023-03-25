import type { Credentials, TokenPayload } from 'google-auth-library';

export type GetAuthURLService = () => string;
export type InitialCredentialsService = (code: string) => Promise<Credentials>;
export type RevokeCredentialsService = () => Promise<void>;
export type VerifyTokenService = (token: string) => Promise<TokenPayload>;
