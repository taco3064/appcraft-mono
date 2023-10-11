import type { Website } from '../websites';

export interface WebsiteToken {
  _id: string;
  userid: string;
  websiteid: string;
}

export interface WebsiteConfig {
  token: string;
  userid: string;
  title: string;
  website: Website;
}
