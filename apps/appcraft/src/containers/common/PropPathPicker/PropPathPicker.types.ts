import type { LayoutWidget } from '@appcraft/types';

//* Component Props
export interface PropPathPickerProps {
  disabled?: boolean;
  label: string;
  layout?: LayoutWidget;
  value?: string;
  onChange?: (value: string) => void;
}
