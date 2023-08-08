import TabScrollButton from '@mui/material/TabScrollButton';
import type { ComponentProps } from 'react';

export { TabScrollButton };

export type TabScrollButtonProps = Pick<
  ComponentProps<typeof TabScrollButton>,
  'direction' | 'orientation' | 'children' | 'disabled'
>;
