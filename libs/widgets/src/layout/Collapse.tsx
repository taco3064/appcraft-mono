import Collapse from '@mui/material/Collapse';
import type { ComponentProps } from 'react';

export { Collapse };

export type CollapseProps = Pick<
  ComponentProps<typeof Collapse>,
  'children' | 'collapsedSize' | 'in' | 'orientation'
>;
