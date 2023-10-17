import Icon from '@mui/material/Icon';
import type { ComponentProps } from 'react';

export { Icon };

export type IconProps = Pick<
  ComponentProps<typeof Icon>,
  'children' | 'color' | 'fontSize'
>;
