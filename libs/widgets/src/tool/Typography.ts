import Typography from '@mui/material/Typography';
import type { ComponentProps } from 'react';

export { Typography };

export type TypographyProps = Pick<
  ComponentProps<typeof Typography>,
  | 'align'
  | 'children'
  | 'color'
  | 'gutterBottom'
  | 'noWrap'
  | 'paragraph'
  | 'variant'
  | 'display'
  | 'justifyContent'
  | 'alignItems'
  | 'gap'
>;
