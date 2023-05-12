import type { DialogProps } from '@mui/material/Dialog';
import type { FilterOptions } from '@appcraft/types';

export interface FilterDialogProps
  extends Omit<DialogProps, 'PaperProps' | 'maxWidth'> {
  values: FilterOptions;

  onConfirm: (values: FilterDialogProps['values']) => void;
  onReset: () => void;
}
