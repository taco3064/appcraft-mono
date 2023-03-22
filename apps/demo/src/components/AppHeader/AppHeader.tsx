import AppBar from '@mui/material/AppBar';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import type * as Types from './AppHeader.types';
import { GapToolbar, Link } from '~demo/styles';
import { SigninDialog } from '../SigninDialog';
import { useFixedT, useUserAccount } from '~demo/hooks';

export default function AppHeader({
  oauth2,
  onMenuToggle,
}: Types.AppHeaderProps) {
  const [at] = useFixedT('app');
  const { authorized } = useUserAccount();
  const [open, setOpen] = useState(false);

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
          >
            Appcraft
          </Link>

          {!authorized && (
            <Tooltip title={at('btn-signin')}>
              <IconButton
                onClick={() => setOpen(true)}
                style={{ marginLeft: 'auto' }}
              >
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
        </GapToolbar>
      </AppBar>

      <Divider />

      <SigninDialog
        oauth2={oauth2}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
