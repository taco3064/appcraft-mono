import AppBar from '@mui/material/AppBar';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import type * as Types from './AppHeader.types';
import { GapToolbar, Link } from '~demo/styles';
import { Signin } from '../Signin';
import { Userinfo } from '../Userinfo';
import { useUserAccount } from '~demo/hooks';

export default function AppHeader({
  oauth2,
  onMenuToggle,
}: Types.AppHeaderProps) {
  const { authorized } = useUserAccount();

  return (
    <AppBar position="sticky" color="default" elevation={0.1}>
      <GapToolbar variant="regular">
        {authorized && onMenuToggle && (
          <IconButton onClick={onMenuToggle}>
            <ChevronRightIcon />
          </IconButton>
        )}

        <Link
          underline="hover"
          variant="h5"
          href="/"
          icon={<AutoAwesomeMosaicIcon />}
          style={{ marginRight: 'auto' }}
        >
          Appcraft
        </Link>

        <Signin oauth2={oauth2} />
        <Userinfo />
      </GapToolbar>

      <Divider />
    </AppBar>
  );
}
