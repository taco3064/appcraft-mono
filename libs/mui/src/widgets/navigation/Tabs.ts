import Tabs from '@mui/material/Tabs';
import type { ComponentProps } from 'react';

export { Tabs };

export type TabsProps = Pick<
  ComponentProps<typeof Tabs>,
  | 'action'
  | 'allowScrollButtonsMobile'
  | 'centered'
  | 'children'
  | 'indicatorColor'
  | 'onChange'
  | 'orientation'
  | 'scrollButtons'
  | 'selectionFollowsFocus'
  | 'textColor'
  | 'variant'
  | 'visibleScrollbar'
>;
