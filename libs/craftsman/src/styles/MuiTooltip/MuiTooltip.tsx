import Tooltip from '@mui/material/Tooltip';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiTooltip.types';

export const AppcraftHint = withStyles(
  ({ disabled, title, ...props }: Types.AppcraftHintProps) => (
    <Tooltip title={disabled ? '' : title} {...props} />
  ),
  (theme) => ({}),
  { name: 'AppcraftHint' }
);
