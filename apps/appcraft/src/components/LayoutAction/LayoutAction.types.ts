import type { LayoutWidget } from '@appcraft/types';
import type { ReactElement } from 'react';

export interface LayoutActionProps {
  layout: LayoutWidget;
  widgetPicker: ReactElement<{ name: 'widget' }>;
  onCancel?: () => void;
  onEdit: (layout: LayoutWidget) => void;
  onRemove: (layout: LayoutWidget) => void;
  onWidgetChange: (id: string) => void;
}
