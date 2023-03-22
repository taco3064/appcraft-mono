import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Toolbar from '@mui/material/Toolbar';

import { useFixedT } from '~demo/hooks';
import type * as Types from './AppHeader.types';

export default function AppHeader({ signinURL }: Types.AppHeaderProps) {
  const [at] = useFixedT('app');

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar variant="regular">
        <Button href={signinURL} startIcon={<GoogleIcon />}>
          {at('btn-signin')}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
