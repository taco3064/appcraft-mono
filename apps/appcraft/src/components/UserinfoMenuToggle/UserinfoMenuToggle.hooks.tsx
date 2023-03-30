import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { lazy, useMemo } from 'react';
import type { Userinfo } from '@appcraft/server';

import type * as Types from './UserinfoMenuToggle.types';

export const useLazyAvatar: Types.LazyAvatarHook = (idToken) =>
  useMemo<typeof Avatar>(
    () =>
      lazy(async () => {
        if (idToken) {
          const { data } = (await axios.get('/api/userinfo/profile')) as {
            data: Userinfo;
          };

          return {
            default: () => (
              <Tooltip title={data.username}>
                <Avatar alt={data.username} src={data.picture} />
              </Tooltip>
            ),
          };
        }

        return { default: Avatar };
      }),
    [idToken]
  );
