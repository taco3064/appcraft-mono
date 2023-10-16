import MuiAvatar from '@mui/material/Avatar';
import type { ComponentProps } from 'react';

export interface AvatarProps
  extends Pick<
    ComponentProps<typeof MuiAvatar>,
    'variant' | 'alt' | 'src' | 'srcSet' | 'children'
  > {
  width?: string;
  height?: string;
}

export const Avatar = ({ width, height, ...props }: AvatarProps) => (
  <MuiAvatar {...props} sx={{ width, height }} />
);
