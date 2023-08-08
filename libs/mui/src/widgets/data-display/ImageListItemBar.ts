import ImageListItemBar from '@mui/material/ImageListItemBar';
import type { ComponentProps } from 'react';

export { ImageListItemBar };

export type ImageListItemBarProps = Pick<
  ComponentProps<typeof ImageListItemBar>,
  'actionIcon' | 'actionPosition' | 'subtitle' | 'title'
>;
