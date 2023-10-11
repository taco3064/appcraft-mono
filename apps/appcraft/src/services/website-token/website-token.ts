import axios from 'axios';
import type { WebsiteConfig, WebsiteToken } from '@appcraft/types';

import type * as Types from './website-token.types';

export const findWebsiteById: Types.FindWebsiteByIdService = async (
  websiteid
) => {
  const { data } = await axios.get<WebsiteToken>(
    `/api/data-forge/website-token/find/${websiteid}`
  );

  return data;
};

export const getWebsiteConfig: Types.GetWebsiteConfigService = async ({
  queryKey: [token],
}) => {
  const { data } = await axios.get<WebsiteConfig>(
    `/api/data-forge/website-token/config/${token}`
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
