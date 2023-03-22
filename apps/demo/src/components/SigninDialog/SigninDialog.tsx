import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
      <DialogTitle>{at('ttl-signin')}</DialogTitle>

      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
}
