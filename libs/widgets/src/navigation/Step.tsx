import Step from '@mui/material/Step';
import type { ComponentProps } from 'react';

export { Step };

export type StepProps = Pick<
  ComponentProps<typeof Step>,
  | 'active'
  | 'children'
  | 'completed'
  | 'disabled'
  | 'expanded'
  | 'index'
  | 'last'
>;
