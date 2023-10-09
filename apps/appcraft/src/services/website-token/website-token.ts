import axios from 'axios';
import type { WebsiteToken } from '@appcraft/types';

import type * as Types from './website-token.types';

export const findWebsite: Types.FindWebsiteService = async (token) => {
  const { data } = await axios.get<WebsiteToken>(
    `/api/data-forge/website-token/find/${token}`
  );

  return data;
};

export const createWebsiteToken: Types.CreateWebsiteTokenService = async (
  websiteid
) => {
  const { data } = await axios.post<string>(
    `/api/data-forge/website-token/create/${websiteid}`
  );

  return data;
};

export const removeWebsiteToken: Types.RemoveWebsiteTokenService = async (
  websiteid
) => axios.delete(`/api/data-forge/website-token/remove/${websiteid}`);
