import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import { Link, SquareLogo } from '~appcraft/styles';
import type * as Types from './AppHeader.types';

export default function AppHeader({
  action,
  title,
  onMenuToggle,
}: Types.AppHeaderProps) {
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar variant="regular">
        {onMenuToggle && (
          <IconButton onClick={onMenuToggle}>
            <MenuIcon />
          </IconButton>
        )}

        <Link
          underline="hover"
          variant="h5"
          href={title.href}
          fontFamily='"comic sans MS"'
          marginRight="auto"
          icon={
            <SquareLogo
              sx={(theme) => ({
                fontSize: theme.spacing(5),
                color: 'primary.dark',
              })}
            />
          }
        >
          {title.text}
        </Link>

        {action}
      </Toolbar>

      <Divider />
    </AppBar>
  );
}
