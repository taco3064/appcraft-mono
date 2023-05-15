import type { DialogProps } from '@mui/material/Dialog';
import type { FilterOptions } from '@appcraft/types';

export interface FilterDialogProps
  extends Omit<DialogProps, 'PaperProps' | 'maxWidth' | 'onClose'> {
  values: FilterOptions;

  onClose: () => void;
  onConfirm: (values: FilterDialogProps['values']) => void;
  onReset: () => void;
}

export type NameOption =
  | string
  | {
      text: string;
      name: string;
    };
