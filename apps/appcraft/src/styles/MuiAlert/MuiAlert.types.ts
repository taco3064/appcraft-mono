import type { AlertProps } from '@mui/material/Alert';
import type { Breakpoint } from '@mui/material/styles';
import type { DialogProps } from '@mui/material/Dialog';
import type { Variant } from '@mui/material/styles/createTypography';

export type ArcAlertProps = Omit<
  DialogProps,
  'fullWidth' | 'maxWidth' | 'PaperProps'
> &
  Pick<AlertProps, 'severity' | 'icon' | 'action'>;

export interface MaxWidthAlertProps extends AlertProps {
  maxWidth: Breakpoint;
  msgVariant?: Variant;
}
