import type { HierarchyData } from '~appcraft/services';

export interface WrapTodoSelectProps {
  disabled?: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onView?: (data: HierarchyData<string>) => void;
}
