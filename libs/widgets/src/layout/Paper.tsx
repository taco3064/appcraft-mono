import Paper from '@mui/material/Paper';
import type { ComponentProps } from 'react';

export { Paper };

export type PaperProps = Pick<
  ComponentProps<typeof Paper>,
  'children' | 'elevation' | 'square' | 'variant'
>;
