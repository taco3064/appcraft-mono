import type { ReactNode } from 'react';

export interface SubheaderProps {
  action?: ReactNode;
  onAddElement?: () => void;
  onBack: (index?: number) => void;

  breadcrumbs: {
    name: string;
    isArrayElement: boolean;
    isLast: boolean;
  }[];
}
