import { MouseEvent, ReactNode } from 'react';

export interface AppHeaderProps {
  action?: ReactNode;
  title: { text: string; href: string };
  onMenuToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
}
