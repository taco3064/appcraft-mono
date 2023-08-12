import StepLabel from '@mui/material/StepLabel';
import type { ComponentProps } from 'react';

export { StepLabel };

export type StepLabelProps = Pick<
  ComponentProps<typeof StepLabel>,
  'children' | 'error' | 'icon' | 'optional'
>;
