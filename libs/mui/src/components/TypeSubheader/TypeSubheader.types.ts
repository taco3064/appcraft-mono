import type { ReactNode } from 'react';

export interface TypeSubheaderProps {
  action?: ReactNode;
  onAddElement?: () => void;
  onBack: (index?: number) => void;

  breadcrumbs: {
    name: string;
    isArrayElement: boolean;
    isLast: boolean;
  }[];
}
