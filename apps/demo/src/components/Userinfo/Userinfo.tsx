import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import Skeleton from '@mui/material/Skeleton';
import { Suspense, useState } from 'react';

import type * as Types from './Userinfo.types';
import { useLazyAvatar } from './Userinfo.hooks';
import { useFixedT, useUserAccount } from '~demo/hooks';

export default function Userinfo({}: Types.UserinfoProps) {
  const [at] = useFixedT('app');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);
  const { authorized, token } = useUserAccount();
  const LazyAvatar = useLazyAvatar(token);

  return !authorized ? null : (
    <Suspense fallback={<Skeleton variant="circular" width={40} height={40} />}>
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <LazyAvatar />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <ListItemButton
          href={`/api/userinfo/signout?token=${encodeURIComponent(token)}`}
        >
          <ListItemIcon sx={(theme) => ({ minWidth: theme.spacing(5) })}>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary={at('btn-signout')} />
        </ListItemButton>
      </Menu>
    </Suspense>
  );
}
