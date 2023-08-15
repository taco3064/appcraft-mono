import type { DialogProps } from '@mui/material/Dialog';

export interface MenuDialogProps<V>
  extends Pick<DialogProps, 'open' | 'onClose'> {
  title?: string;
  value?: V | null;
  onChange: (newValue: V) => void;

  options: {
    primary: string;
    secondary?: string;
    value: V;
  }[];
}
