import type { ReactNode } from 'react';

export interface WidgetEditorBarProps {
  children: ReactNode;
  variant: 'elements' | 'props';
  onElementAdd: (id: string) => void;
  onVariantChange: (variant: WidgetEditorBarProps['variant']) => void;
}
