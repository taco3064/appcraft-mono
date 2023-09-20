import type { LayoutWidget } from '@appcraft/types';
import type { GetWidgetOptionsFn } from '@appcraft/exhibitor';

export interface LayoutPropsEditorProps {
  layouts: LayoutWidget[];
  value: LayoutWidget;
  getWidgetOptions: GetWidgetOptionsFn;
  onChange: (value: LayoutWidget) => void;
  onClose: () => void;
}
