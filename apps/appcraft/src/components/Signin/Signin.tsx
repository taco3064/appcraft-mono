import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import type * as Types from './Signin.types';
import { FlexDialog } from '~appcraft/styles';
import { useFixedT, useUserAccount } from '~appcraft/hooks';

export default function Signin({ oauth2 }: Types.SigninProps) {
  const [at] = useFixedT('app');
  const { authorized } = useUserAccount();
  const [open, setOpen] = useState(false);

  return authorized ? null : (
    <>
      <Tooltip title={at('btn-signin')}>
        <IconButton onClick={() => setOpen(true)}>
          <LoginIcon />
        </IconButton>
      </Tooltip>

      <FlexDialog
        fullWidth
        maxWidth="xs"
        direction="column"
        icon={<LoginIcon />}
        title={at('ttl-signin')}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ButtonGroup
          fullWidth
          size="large"
          orientation="vertical"
          variant="contained"
        >
          <Button href={oauth2.google} startIcon={<GoogleIcon />}>
            Google
          </Button>
        </ButtonGroup>

        <Divider />

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={(e) => setOpen(false)}
        >
          {at('btn-cancel')}
        </Button>
      </FlexDialog>
    </>
  );
}
