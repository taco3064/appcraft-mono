import Avatar from '@mui/material/Avatar';
import type { ComponentProps } from 'react';

export { Avatar };

export type AvatarProps = Pick<
  ComponentProps<typeof Avatar>,
  'variant' | 'alt' | 'sizes' | 'src' | 'srcSet' | 'children'
>;
