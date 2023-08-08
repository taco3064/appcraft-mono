import ListItem from '@mui/material/ListItem';
import type { ComponentProps } from 'react';

export { ListItem };

export type ListItemProps = Pick<
  ComponentProps<typeof ListItem>,
  | 'alignItems'
  | 'children'
  | 'dense'
  | 'disableGutters'
  | 'disablePadding'
  | 'divider'
  | 'secondaryAction'
>;
