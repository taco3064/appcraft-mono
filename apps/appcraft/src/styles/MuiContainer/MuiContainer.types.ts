import type { ContainerProps } from '@mui/material/Container';
import type { ReactNode } from 'react';

export interface PageContainerProps
  extends Omit<ContainerProps, 'classes' | 'disableGutters' | 'title'> {
  ContentProps?: Omit<ContainerProps, 'role' | 'children' | 'component'>;
  action?: ReactNode;
  primary: string;
  secondary?: string;

  classes?: ContainerProps['classes'] & {
    title?: string;
  };
}
