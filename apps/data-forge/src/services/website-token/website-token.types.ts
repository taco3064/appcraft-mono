import type { Userinfo, WebsiteConfig, WebsiteToken } from '@appcraft/types';

export type GetConfigByTokenService = (token: string) => Promise<WebsiteConfig>;

export type FindService = (
  userid: string,
  websiteid: string
) => Promise<WebsiteToken>;

export type CreateService = (
  user: Userinfo,
  websiteid: string
) => Promise<string>;

export type RemoveService = (
  userid: string,
  websiteid: string
) => Promise<void>;
