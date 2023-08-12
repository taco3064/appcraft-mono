import ImageList from '@mui/material/ImageList';
import type { ComponentProps } from 'react';

export { ImageList };

export type ImageListProps = Pick<
  ComponentProps<typeof ImageList>,
  'children' | 'cols' | 'gap' | 'rowHeight' | 'variant'
>;
