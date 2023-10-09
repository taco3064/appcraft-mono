import { ObjectId } from 'mongodb';
import type { WebsiteToken } from '@appcraft/types';

export type FindService = (token: string) => Promise<WebsiteToken>;

export type CreateService = (
  userid: string,
  websiteid: string
) => Promise<ObjectId>;

export type RemoveService = (userid: string, dataid: string) => Promise<void>;
