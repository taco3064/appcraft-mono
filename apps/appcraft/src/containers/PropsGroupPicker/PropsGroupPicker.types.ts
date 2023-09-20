import type { LayoutWidget } from '@appcraft/types';
import type { WidgetViewHandler } from '../index.types';

export interface PropsGroupPickerProps {
  disabled?: boolean;
  label: string;
  layouts: LayoutWidget[];
  value?: string;
  onChange?: (value: string) => void;
  onView?: WidgetViewHandler;
}
