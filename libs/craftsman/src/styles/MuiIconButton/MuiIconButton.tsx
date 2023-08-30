import IconButton from '@mui/material/IconButton';

import { AppcraftHint } from '../MuiTooltip';
import type * as Types from './MuiIconButton.types';

export function IconTipButton({ title, ...props }: Types.IconTipButtonProps) {
  return (
    <AppcraftHint title={title} disabled={props.disabled}>
      <IconButton {...props} />
    </AppcraftHint>
  );
}
