import Tooltip from '@mui/material/Tooltip';
import type { ComponentProps } from 'react';

export { Tooltip };

export type TooltipProps = Pick<
  ComponentProps<typeof Tooltip>,
  | 'children'
  | 'arrow'
  | 'describeChild'
  | 'disableFocusListener'
  | 'disableHoverListener'
  | 'disableInteractive'
  | 'disableTouchListener'
  | 'followCursor'
  | 'onClose'
  | 'onOpen'
  | 'open'
  | 'placement'
  | 'title'
>;
