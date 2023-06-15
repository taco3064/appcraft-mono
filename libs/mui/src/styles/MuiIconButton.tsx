import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { withStyles } from 'tss-react/mui';

export const IconTipButton = withStyles(
  ({ title, ...props }: IconButtonProps & Pick<TooltipProps, 'title'>) => (
    <Tooltip title={title}>
      <IconButton {...props} />
    </Tooltip>
  ),
  () => ({}),
  { name: 'IconTipButton' }
);
