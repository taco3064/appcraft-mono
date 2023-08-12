import CardMedia from '@mui/material/CardMedia';
import type { ComponentProps } from 'react';

export { CardMedia };

export type CardMediaProps = Pick<
  ComponentProps<typeof CardMedia>,
  'children' | 'image' | 'src'
>;
