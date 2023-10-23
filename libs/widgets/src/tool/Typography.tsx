import Typography from '@mui/material/Typography';
import type { ComponentProps } from 'react';

export { Typography };

export type TypographyProps = Pick<
  ComponentProps<typeof Typography>,
  | 'align'
  | 'alignItems'
  | 'children'
  | 'display'
  | 'fontWeight'
  | 'gap'
  | 'gutterBottom'
  | 'justifyContent'
  | 'noWrap'
  | 'paragraph'
  | 'variant'
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
