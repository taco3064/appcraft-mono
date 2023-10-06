import type { Breakpoint } from '@mui/material/styles';
import type { PageData } from '~appcraft/hooks';

export interface PagePreviewProps {
  breakpoint?: Breakpoint;
  options?: PageData;
}
