import type { LayoutWidget } from '@appcraft/types';

export interface LayoutPropsEditorProps {
  value: LayoutWidget;
  onChange: (value: LayoutWidget) => void;
  onClose: () => void;
}
