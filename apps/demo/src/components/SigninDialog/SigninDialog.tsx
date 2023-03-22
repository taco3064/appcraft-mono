import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';

import { useFixedT } from '~demo/hooks';
import type * as Types from './SigninDialog.types';

export default function SigninDialog({
  oauth2,
  open,
  onClose,
}: Types.SigninDialogProps) {
  const [at] = useFixedT('app');

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle align="center" variant="h5">
        {at('ttl-signin')}
      </DialogTitle>

      <DialogContent
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
        })}
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
          onClick={(e) => onClose(e, 'escapeKeyDown')}
        >
          {at('btn-cancel')}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
