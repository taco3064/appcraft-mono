import type { LayoutWidget } from '@appcraft/types';

export interface LayoutPropsEditorProps {
  layouts: LayoutWidget[];
  value: LayoutWidget;
  onChange: (value: LayoutWidget) => void;
  onClose: () => void;
}
