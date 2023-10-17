import Typography from '@mui/material/Typography';
import type { ComponentProps } from 'react';

export { Typography };

export type TypographyProps = Pick<
  ComponentProps<typeof Typography>,
  | 'align'
  | 'children'
  | 'gutterBottom'
  | 'noWrap'
  | 'paragraph'
  | 'variant'
  | 'display'
  | 'justifyContent'
  | 'alignItems'
  | 'gap'
> & {
  color?:
    | 'primary'
    | 'secondary'
    | 'error.main'
    | 'info.main'
    | 'success.main'
    | 'warning.main'
    | 'text.disabled'
    | 'text.primary'
    | 'text.secondary';
};
