import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';

import CommonButton from '../common/CommonButton';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './SigninButton.types';

export default function SigninButton({
  oauth2,
  onSigninClick,
}: Types.SigninButtonProps) {
  const [at] = useFixedT('app');
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonButton
        btnVariant="icon"
        icon={<LoginIcon />}
        text={at('btn-signin')}
        onClick={() => setOpen(true)}
      />

      <CraftsmanStyle.FlexDialog
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
          <Button
            href={oauth2.google}
            startIcon={<GoogleIcon />}
            onClick={(e) => onSigninClick?.('google', e)}
          >
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
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
