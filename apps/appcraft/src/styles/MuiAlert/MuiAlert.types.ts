import type { AlertProps } from '@mui/material/Alert';
import type { DialogProps } from '@mui/material/Dialog';

export type ArcAlertProps = Omit<
  DialogProps,
  'fullWidth' | 'maxWidth' | 'PaperProps'
> &
  Pick<AlertProps, 'severity' | 'icon' | 'action'>;
