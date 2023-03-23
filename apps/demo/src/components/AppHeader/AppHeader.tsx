import AppBar from '@mui/material/AppBar';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import type * as Types from './AppHeader.types';
import { GapToolbar, Link } from '~demo/styles';
import { Signin } from '../Signin';
import { Userinfo } from '../Userinfo';

export default function AppHeader({
  oauth2,
  onMenuToggle,
}: Types.AppHeaderProps) {
  return (
    <>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <GapToolbar variant="regular">
          {onMenuToggle && (
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
      </AppBar>

      <Divider />
    </>
  );
}
