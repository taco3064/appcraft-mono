import List from '@mui/material/List';
import type { ComponentProps } from 'react';

export { List };

export type ListProps = Pick<
  ComponentProps<typeof List>,
  'children' | 'dense' | 'disablePadding' | 'subheader'
>;
