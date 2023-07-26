import { MouseEvent, ReactNode } from 'react';

export interface AppHeaderProps {
  action?: ReactNode;
  authorized: boolean;
  onMenuToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
}
