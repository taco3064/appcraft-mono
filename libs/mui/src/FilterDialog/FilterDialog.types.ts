import type { DialogProps } from '@mui/material/Dialog';
import type { PropTypesDef } from '@appcraft/types';

export interface FilterDialogProps
  extends Omit<DialogProps, 'PaperProps' | 'maxWidth'> {
  values?: {
    types: PropTypesDef['type'][];
    names: RegExp[];
  };

  onConfirm: (values: FilterDialogProps['values']) => void;
  onReset: () => void;
}
