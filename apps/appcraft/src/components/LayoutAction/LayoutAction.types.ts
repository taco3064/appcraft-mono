import type { ReactElement } from 'react';

export interface LayoutActionProps {
  widgetPicker: ReactElement<{ name: 'widget' }>;
  onClose: () => void;
  onEdit: () => void;
  onRemove: () => void;
  onWidgetChange: (id: string) => void;
}
