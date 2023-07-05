import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import { Suspense, useState } from 'react';
import type { Userinfo } from '@appcraft/types';

import * as Hooks from '~appcraft/hooks';
import { Link, SizedListItemIcon } from '~appcraft/styles';
import type * as Types from './UserinfoMenuToggle.types';

export default function UserinfoMenuToggle({
  menuTransform,
  signoutURL,
}: Types.UserinfoMenuToggleProps) {
  const [at] = Hooks.useFixedT('app');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);
  const [{ authorized, tokens }] = Hooks.useAuth();

  const LazyAvatar = Hooks.useLazyUserProfile<Userinfo>(
    tokens.id,
    ({ fetchData }) => (
      <Tooltip title={fetchData?.username}>
        <Avatar alt={fetchData?.username} src={fetchData?.picture} />
      </Tooltip>
    )
  );

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

        <ListItemButton dense href={signoutURL}>
          <SizedListItemIcon size="small">
            <LogoutIcon />
          </SizedListItemIcon>

          <ListItemText primary={at('btn-signout')} />
        </ListItemButton>
      </Menu>
    </Suspense>
  );
}
