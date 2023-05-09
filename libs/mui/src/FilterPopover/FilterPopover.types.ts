import type { PopoverProps } from '@mui/material/Popover';
import type { PropTypesDef } from '@appcraft/types';

export interface FilterPopoverProps extends Omit<PopoverProps, 'PaperProps'> {
  values?: {
    types: PropTypesDef['type'][];
    names: RegExp[];
  };

  onConfirm: (values: FilterPopoverProps['values']) => void;
  onReset: () => void;
}
