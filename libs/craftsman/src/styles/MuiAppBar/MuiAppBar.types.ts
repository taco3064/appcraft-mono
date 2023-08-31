import type { AppBarProps } from '@mui/material/AppBar';
import type { MouseEventHandler, ReactNode } from 'react';

export interface WidgetAppBarProps {
  action?: ReactNode;
  children: ReactNode;
  sx?: AppBarProps['sx'];

  classes?: {
    root?: string;
    action?: string;
    back?: string;
    title?: string;
    toolbar?: string;
  };

  BackButtonProps?: {
    icon: ReactNode;
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
}
