import type { Credentials, TokenPayload } from 'google-auth-library';

export type GetAuthURL = () => string;
export type InitialCredentials = (code: string) => Promise<Credentials>;
export type RevokeCredentials = () => Promise<void>;
export type VerifyToken = (token: string) => Promise<TokenPayload>;
