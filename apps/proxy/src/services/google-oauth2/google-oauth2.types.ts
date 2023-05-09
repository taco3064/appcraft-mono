import type { Credentials } from 'google-auth-library';
import type { Userinfo } from '@appcraft/types';

export type GetAuthURLService = () => Promise<string>;
export type InitialCredentialsService = (code: string) => Promise<Credentials>;
export type RevokeTokenService = (accessToken: string) => Promise<void>;
export type VerifyTokenService = (idToken: string) => Promise<Userinfo>;
