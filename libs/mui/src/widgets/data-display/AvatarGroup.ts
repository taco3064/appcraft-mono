import AvatarGroup from '@mui/material/AvatarGroup';
import type { ComponentProps } from 'react';

export { AvatarGroup };

export type AvatarGroupProps = Pick<
  ComponentProps<typeof AvatarGroup>,
  'spacing' | 'max' | 'total' | 'variant' | 'children'
>;
