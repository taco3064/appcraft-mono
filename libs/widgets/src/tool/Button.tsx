import MuiButton from '@mui/material/Button';
import type { ComponentProps } from 'react';

export interface ButtonProps
  extends Pick<
    ComponentProps<typeof MuiButton>,
    | 'children'
    | 'color'
    | 'disabled'
    | 'endIcon'
    | 'fullWidth'
    | 'href'
    | 'size'
    | 'startIcon'
    | 'variant'
    | 'onClick'
  > {
  href?: string;
}

export const Button = ({ href, ...props }: ButtonProps) => (
  <MuiButton {...props} {...(href && { href, LinkComponent: 'a' })} />
);
