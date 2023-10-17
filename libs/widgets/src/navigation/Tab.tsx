import Tab from '@mui/material/Tab';
import type { ComponentProps } from 'react';

export { Tab };

export type TabProps = Pick<
  ComponentProps<typeof Tab>,
  | 'children'
  | 'disabled'
  | 'icon'
  | 'iconPosition'
  | 'label'
  | 'value'
  | 'wrapped'
>;
