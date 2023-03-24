import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Skeleton from '@mui/material/Skeleton';
import { Suspense, useState } from 'react';

import type * as Types from './Userinfo.types';
import { Link, SizedListItemIcon } from '~appcraft-cms/styles';
import { useLazyAvatar } from './Userinfo.hooks';
import { useFixedT, useUserAccount } from '~appcraft-cms/hooks';

export default function Userinfo({ menuTransform }: Types.UserinfoProps) {
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
        elevation={1}
        open={Boolean(anchorEl)}
        onClick={() => setAnchorEl(null)}
        style={{ transform: menuTransform }}
      >
        <ListItemButton dense disableGap href="/settings" component={Link}>
          <SizedListItemIcon size="small">
            <SettingsOutlinedIcon />
          </SizedListItemIcon>

          <ListItemText primary={at('btn-settings')} />
        </ListItemButton>

        <Divider />

        <ListItemButton
          dense
          href={`/api/userinfo/signout?token=${encodeURIComponent(token)}`}
        >
          <SizedListItemIcon size="small">
            <LogoutIcon />
          </SizedListItemIcon>

          <ListItemText primary={at('btn-signout')} />
        </ListItemButton>
      </Menu>
    </Suspense>
  );
}
