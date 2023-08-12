import MenuItem from '@mui/material/MenuItem';
import type { ComponentProps } from 'react';

export { MenuItem };

export type MenuItemProps = Pick<
  ComponentProps<typeof MenuItem>,
  | 'autoFocus'
  | 'children'
  | 'dense'
  | 'disableGutters'
  | 'divider'
  | 'selected'
  | 'value'
>;
