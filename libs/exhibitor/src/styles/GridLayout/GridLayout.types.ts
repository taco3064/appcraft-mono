import type { Breakpoint } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';

export interface GridLayoutContainerProps extends ContainerProps {
  breakpoint?: Breakpoint;
}
