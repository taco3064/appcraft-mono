import type { MouseEventHandler, ReactNode } from 'react';

export interface WidgetAppBarProps {
  action?: ReactNode;
  children: ReactNode;

  classes?: {
    root?: string;
    action?: string;
    back?: string;
    toolbar?: string;
  };

  BackButtonProps?: {
    icon: ReactNode;
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
}
