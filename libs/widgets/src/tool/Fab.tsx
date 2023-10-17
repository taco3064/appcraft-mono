import MuiFab from '@mui/material/Fab';
import type { ComponentProps } from 'react';

export interface FabProps
  extends Pick<
    ComponentProps<typeof MuiFab>,
    'children' | 'color' | 'disabled' | 'href' | 'variant' | 'onClick'
  > {
  href?: string;
}

export const Fab = ({ href, ...props }: FabProps) => (
  <Fab {...props} {...(href && { href, LinkComponent: 'a' })} />
);
