import Badge from '@mui/material/Badge';
import type { ComponentProps } from 'react';

export { Badge };

export type BadgeProps = Pick<
  ComponentProps<typeof Badge>,
  | 'anchorOrigin'
  | 'badgeContent'
  | 'children'
  | 'color'
  | 'invisible'
  | 'max'
  | 'overlap'
  | 'showZero'
  | 'variant'
>;
