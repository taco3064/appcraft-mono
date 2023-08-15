import type { TypographyProps } from '@mui/material/Typography';
import type { Breakpoint } from '@mui/material/styles';

export interface AutoBreakTypographyProps {
  autoBreakpoint?: Breakpoint;
  primaryTypographyProps?: Omit<TypographyProps, 'className'>;
  secondaryTypographyProps?: Omit<TypographyProps, 'className'>;
  primary: string;
  secondary?: string;

  classes?: {
    root?: string;
  };
}
