import type { HierarchyData } from '~appcraft/services';

export type TodoWrapperViewHandler = (data: HierarchyData<string>) => void;

export interface TodoWrapperPickerProps {
  disabled?: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onView?: TodoWrapperViewHandler;
}
