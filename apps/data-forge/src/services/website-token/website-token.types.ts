import type { Userinfo, WebsiteToken } from '@appcraft/types';

export type FindByTokenService = (token: string) => Promise<WebsiteToken>;

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
