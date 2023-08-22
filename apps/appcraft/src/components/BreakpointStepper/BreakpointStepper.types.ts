import type { Breakpoint } from '@mui/material/styles';

export interface BreakpointStepperProps {
  disableNextButton?: boolean;
  value: Breakpoint;
  onChange: (value: Breakpoint) => void;
}
