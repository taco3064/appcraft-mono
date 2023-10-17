import StepButton from '@mui/material/StepButton';
import type { ComponentProps } from 'react';

export { StepButton };

export type StepButtonProps = Pick<
  ComponentProps<typeof StepButton>,
  'children' | 'icon' | 'optional' | 'onClick'
>;
