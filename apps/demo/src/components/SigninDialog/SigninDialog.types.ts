import type { DialogProps } from '@mui/material/Dialog';

export interface SigninDialogProps
  extends Pick<DialogProps, 'open' | 'onClose'> {
  oauth2: {
    google: string;
  };
}
