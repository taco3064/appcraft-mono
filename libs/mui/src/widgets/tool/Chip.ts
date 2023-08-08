import Chip from '@mui/material/Chip';
import type { ComponentProps } from 'react';

export { Chip };

export type ChipProps = Pick<
  ComponentProps<typeof Chip>,
  | 'avatar'
  | 'children'
  | 'clickable'
  | 'color'
  | 'deleteIcon'
  | 'disabled'
  | 'icon'
  | 'label'
  | 'onDelete'
  | 'size'
  | 'variant'
  | 'onClick'
>;
