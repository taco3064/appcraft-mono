import StepIcon from '@mui/material/StepIcon';
import type { ComponentProps } from 'react';

export { StepIcon };

export type StepIconProps = Pick<
  ComponentProps<typeof StepIcon>,
  'active' | 'completed' | 'error' | 'icon'
>;
