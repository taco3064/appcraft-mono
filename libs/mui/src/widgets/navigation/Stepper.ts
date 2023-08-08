import Stepper from '@mui/material/Stepper';
import type { ComponentProps } from 'react';

export { Stepper };

export type StepperProps = Pick<
  ComponentProps<typeof Stepper>,
  'activeStep' | 'alternativeLabel' | 'children' | 'nonLinear' | 'orientation'
>;
