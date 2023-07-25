import AppBar from '@mui/material/AppBar';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import { Link } from '~appcraft/styles';
import { SigninButton } from '~appcraft/components/SigninButton';
import { UserinfoMenuToggle } from '~appcraft/components/UserinfoMenuToggle';
import type * as Types from './AppHeader.types';

export default function AppHeader({
  authorized,
  oauth2,
  signoutURL,
  onMenuToggle,
  onSigninClick,
}: Types.AppHeaderProps) {
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar variant="regular">
        {authorized && onMenuToggle && (
          <IconButton onClick={onMenuToggle}>
            <MenuIcon />
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
          <SigninButton oauth2={oauth2} onSigninClick={onSigninClick} />
        )}
      </Toolbar>

      <Divider />
    </AppBar>
  );
}
