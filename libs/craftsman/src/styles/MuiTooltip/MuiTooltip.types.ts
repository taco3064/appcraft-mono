import type { TooltipProps } from '@mui/material/Tooltip';

export interface AppcraftHintProps extends Omit<TooltipProps, 'open'> {
  disabled?: boolean;
}
