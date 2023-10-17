import MuiIconButton from '@mui/material/IconButton';
import type { ComponentProps } from 'react';

export interface IconButtonProps
  extends Pick<
    ComponentProps<typeof MuiIconButton>,
    'children' | 'color' | 'disabled' | 'size' | 'onClick'
  > {
  href?: string;
}

export const IconButton = ({ href, ...props }: IconButtonProps) => (
  <MuiIconButton {...props} {...(href && { href, LinkComponent: 'a' })} />
);
