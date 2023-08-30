import type { LayoutWidget } from '@appcraft/types';
import type { TransformHandlers } from '~appcraft/hooks';

export interface LayoutPropsEditorProps {
  layouts: LayoutWidget[];
  value: LayoutWidget;
  onChange: (value: LayoutWidget) => void;
  onClose: () => void;
}
