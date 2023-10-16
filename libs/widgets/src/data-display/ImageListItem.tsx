import MuiImageListItem from '@mui/material/ImageListItem';
import type { ComponentProps } from 'react';

export interface ImageListItemProps
  extends Pick<
    ComponentProps<typeof MuiImageListItem>,
    'children' | 'cols' | 'rows'
  > {
  alt?: string;
  src?: string;
  srcSet?: string;
}

export const ImageListItem = ({
  children,
  alt,
  src,
  srcSet,
  ...props
}: ImageListItemProps) => (
  <MuiImageListItem {...props}>
    {src && <img {...{ alt, src, srcSet }} loading="lazy" />}
    {children}
  </MuiImageListItem>
);
