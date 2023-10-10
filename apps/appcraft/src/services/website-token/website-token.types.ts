import type { QueryFunction } from '@tanstack/react-query';
import type { WebsiteToken } from '@appcraft/types';

export type FindWebsiteByIdService = (
  websiteid: string
) => Promise<WebsiteToken>;

export type FindWebsiteByTokenService = QueryFunction<
  WebsiteToken,
  readonly [string]
>;

export type CreateWebsiteTokenService = (websiteid: string) => Promise<string>;

export type RemoveWebsiteTokenService = (websiteid: string) => Promise<void>;
