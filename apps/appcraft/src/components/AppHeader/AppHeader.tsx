import AppBar from '@mui/material/AppBar';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import { Link } from '~appcraft/styles';
import type * as Types from './AppHeader.types';

export default function AppHeader({
  action,
  authorized,
  onMenuToggle,
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

        {action}
      </Toolbar>

      <Divider />
    </AppBar>
  );
}
