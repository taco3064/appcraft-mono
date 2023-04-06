import AppBar from '@mui/material/AppBar';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import { GapToolbar, Link } from '~appcraft/styles';
import { SigninButton } from '~appcraft/components/SigninButton';
import { UserinfoMenuToggle } from '~appcraft/components/UserinfoMenuToggle';
import type * as Types from './AppHeader.types';

export default function AppHeader({
  authorized,
  oauth2,
  signoutURL,
  onMenuToggle,
}: Types.AppHeaderProps) {
  return (
    <AppBar position="sticky" color="default" elevation={0}>
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

        {authorized ? (
          <UserinfoMenuToggle
            signoutURL={signoutURL}
            menuTransform="translate(12px, 10px)"
          />
        ) : (
          <SigninButton oauth2={oauth2} />
        )}
      </GapToolbar>

      <Divider />
    </AppBar>
  );
}
