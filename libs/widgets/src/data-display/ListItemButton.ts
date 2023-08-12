import ListItemButton from '@mui/material/ListItemButton';
import type { ComponentProps } from 'react';

export { ListItemButton };

export type ListItemButtonProps = Pick<
  ComponentProps<typeof ListItemButton>,
  | 'alignItems'
  | 'autoFocus'
  | 'children'
  | 'dense'
  | 'disabled'
  | 'disableGutters'
  | 'divider'
  | 'selected'
  | 'onClick'
>;
