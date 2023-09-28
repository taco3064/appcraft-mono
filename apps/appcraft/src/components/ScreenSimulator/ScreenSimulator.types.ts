import type { Breakpoint } from '@mui/material/styles';
import type { ReactNode } from 'react';

//* Variables
export type BreakpointConfig = Record<Breakpoint, number>;

//* Component Props
export interface ScreenSimulatorProps {
  children: ReactNode;
  title?: ReactNode;
}
