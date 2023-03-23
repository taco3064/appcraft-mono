import Avatar from '@mui/material/Avatar';
import axios, { AxiosRequestHeaders } from 'axios';
import { lazy, useMemo } from 'react';

import type * as Types from './Userinfo.types';
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
            default: () => <Avatar alt="" src={data.picture} />,
          };
        }

        return { default: Avatar };
      }),
    [token]
  );
