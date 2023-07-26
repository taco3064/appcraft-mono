import type { HierarchyData } from '~appcraft/services';

export interface WidgetSelectProps {
  disabled?: boolean;
  exclude?: string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  onView?: (data: HierarchyData<string>) => void;
}
