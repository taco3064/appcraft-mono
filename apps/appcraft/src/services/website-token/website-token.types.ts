import type { WebsiteToken } from '@appcraft/types';

export type FindWebsiteService = (
  token: string
) => Promise<Omit<WebsiteToken, '_id'>>;

export type CreateWebsiteTokenService = (websiteid: string) => Promise<string>;

export type RemoveWebsiteTokenService = (websiteid: string) => Promise<void>;
