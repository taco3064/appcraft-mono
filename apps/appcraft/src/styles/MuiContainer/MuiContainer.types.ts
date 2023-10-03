import type { Breakpoint, Theme } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';
import type { ReactNode } from 'react';

//* Variables
export type BreakpointConfig = Record<Breakpoint, number>;

//* Component Props
export interface PageContainerProps
  extends Omit<ContainerProps, 'classes' | 'disableGutters' | 'title'> {
  ContentProps?: Omit<ContainerProps, 'role' | 'children' | 'component'>;
  action?: ReactNode;
  primary: string;
  secondary?: string;

  classes?: ContainerProps['classes'] & {
    content?: string;
    title?: string;
    toolbar?: string;
  };
}

export interface ScreenSimulatorProps {
  maxWidth: Breakpoint;
  children: ReactNode;
  minHeight?: (theme: Theme) => string | number;

  classes?: {
    root?: string;
    border?: string;
    viewport?: string;
    scale?: string;
  };
}
