import Tooltip from '@mui/material/Tooltip';
import { withStyles } from 'tss-react/mui';
import type { TooltipProps } from '@mui/material/Tooltip';

export const AppcraftHint = withStyles(
  ({ children, ...props }: TooltipProps) => (
    <Tooltip {...props}>
      <span>{children}</span>
    </Tooltip>
  ),
  () => ({}),
  { name: 'AppcraftHint' }
);
