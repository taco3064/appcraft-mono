import type { Credentials } from 'google-auth-library';
import type { Userinfo } from '@appcraft/server';

export type GetAuthURLService = () => Promise<string>;
export type InitialCredentialsService = (code: string) => Promise<Credentials>;
export type RevokeCredentialsService = () => Promise<void>;
export type VerifyTokenService = (token: string) => Promise<Userinfo>;
