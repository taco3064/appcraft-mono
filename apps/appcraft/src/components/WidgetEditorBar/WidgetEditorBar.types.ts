import type { ReactNode } from 'react';

export interface WidgetEditorBarProps {
  accordion: ReactNode;
  action?: ReactNode;
  variant: 'elements' | 'props';
  onElementAdd: (id: string) => void;
  onVariantChange: (variant: WidgetEditorBarProps['variant']) => void;
}
