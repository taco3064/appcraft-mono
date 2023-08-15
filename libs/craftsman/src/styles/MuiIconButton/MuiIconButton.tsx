import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import type * as Types from './MuiIconButton.types';

export function IconTipButton({ title, ...props }: Types.IconTipButtonProps) {
  return (
    <Tooltip title={title}>
      <IconButton {...props} />
    </Tooltip>
  );
}
