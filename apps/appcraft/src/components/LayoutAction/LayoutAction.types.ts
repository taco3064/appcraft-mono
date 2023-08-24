import type { ReactElement } from 'react';

export interface LayoutActionProps {
  widgetPicker: ReactElement<{ name: 'widget' }>;
  onEdit: () => void;
  onRemove: () => void;
  onWidgetChange: (id: string) => void;
}
