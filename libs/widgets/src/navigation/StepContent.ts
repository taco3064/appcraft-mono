import StepContent from '@mui/material/StepContent';
import type { ComponentProps } from 'react';

export { StepContent };

export type StepContentProps = Pick<
  ComponentProps<typeof StepContent>,
  'children'
>;
