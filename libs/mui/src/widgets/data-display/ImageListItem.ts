import ImageListItem from '@mui/material/ImageListItem';
import type { ComponentProps } from 'react';

export { ImageListItem };

export type ImageListItemProps = Pick<
  ComponentProps<typeof ImageListItem>,
  'children' | 'cols' | 'rows'
>;
