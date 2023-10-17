import MuiListItemButton from '@mui/material/ListItemButton';
import type { ComponentProps } from 'react';

export interface ListItemButtonProps
  extends Pick<
    ComponentProps<typeof MuiListItemButton>,
    | 'alignItems'
    | 'autoFocus'
    | 'children'
    | 'dense'
    | 'disabled'
    | 'disableGutters'
    | 'divider'
    | 'selected'
    | 'onClick'
  > {
  href?: string;
}

export const ListItemButton = ({ href, ...props }: ListItemButtonProps) => (
  <MuiListItemButton {...props} {...(href && { href, LinkComponent: 'a' })} />
);
