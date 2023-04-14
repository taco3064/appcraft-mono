import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Skeleton from '@mui/material/Skeleton';
import { Suspense, useState } from 'react';

import type * as Types from './UserinfoMenuToggle.types';
import { Link, SizedListItemIcon } from '~appcraft/styles';
import { useLazyAvatar } from './UserinfoMenuToggle.hooks';
import { useFixedT, useAuthTokens } from '~appcraft/hooks';

export default function UserinfoMenuToggle({
  menuTransform,
  signoutURL,
}: Types.UserinfoMenuToggleProps) {
  const [at] = useFixedT('app');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);
  const { authorized, tokens } = useAuthTokens();
  const LazyAvatar = useLazyAvatar(tokens.id);

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
