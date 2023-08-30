import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Skeleton from '@mui/material/Skeleton';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { Suspense, useState } from 'react';
import type { Userinfo } from '@appcraft/types';

import { Link } from '~appcraft/styles';
import { useAuth, useFixedT } from '~appcraft/contexts';
import { useLazyUserProfile } from '~appcraft/hooks';
import type * as Types from './UserinfoMenuToggle.types';

export default function UserinfoMenuToggle({
  menuTransform,
  signoutURL,
}: Types.UserinfoMenuToggleProps) {
  const [at] = useFixedT('app');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);
  const [{ authorized, tokens }] = useAuth();

  const LazyAvatar = useLazyUserProfile<Userinfo>(
    tokens.id,
    ({ fetchData }) => (
      <CraftsmanStyle.AppcraftHint title={fetchData?.username}>
        <Avatar alt={fetchData?.username} src={fetchData?.picture} />
      </CraftsmanStyle.AppcraftHint>
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
        <ListItemButton
          dense
          disableGap
          disableGutters
          href="/settings"
          component={Link}
        >
          <ListItemIcon style={{ justifyContent: 'center' }}>
            <SettingsOutlinedIcon />
          </ListItemIcon>

          <ListItemText
            primary={at('btn-settings')}
            primaryTypographyProps={{ variant: 'subtitle1', marginRight: 2 }}
          />
        </ListItemButton>

        <Divider />

        <ListItemButton dense disableGutters href={signoutURL}>
          <ListItemIcon style={{ justifyContent: 'center' }}>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText
            primary={at('btn-signout')}
            primaryTypographyProps={{ variant: 'subtitle1', marginRight: 2 }}
          />
        </ListItemButton>
      </Menu>
    </Suspense>
  );
}
