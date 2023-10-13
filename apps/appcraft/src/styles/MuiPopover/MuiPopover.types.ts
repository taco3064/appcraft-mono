import type { PaperProps } from '@mui/material/Paper';
import type { PopoverProps } from '@mui/material/Popover';

export interface ScaledPopoverProps
  extends Omit<PopoverProps, 'PaperProps' | 'classes'> {
  PaperProps?: Omit<PaperProps, 'component'>;
  contentWidth?: number | string;
  scale?: number;

  classes?: PopoverProps['classes'] & {
    content?: string;
  };
}
