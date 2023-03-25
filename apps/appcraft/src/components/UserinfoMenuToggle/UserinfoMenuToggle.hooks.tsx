import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import axios, { AxiosRequestHeaders } from 'axios';
import { lazy, useMemo } from 'react';

import type * as Types from './UserinfoMenuToggle.types';
import type { Profile } from '~proxy/endpoints';

export const useLazyAvatar: Types.LazyAvatarHook = (token) =>
  useMemo<typeof Avatar>(
    () =>
      lazy(async () => {
        if (token) {
          axios.interceptors.request.use(({ headers, ...options }) => ({
            ...options,

            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
            } as AxiosRequestHeaders,
          }));

          const { data } = (await axios.get('/api/userinfo/profile')) as {
            data: Profile;
          };

          return {
            default: () => (
              <Tooltip title={data.username}>
                <Avatar alt="" src={data.picture} />
              </Tooltip>
            ),
          };
        }

        return { default: Avatar };
      }),
    [token]
  );
