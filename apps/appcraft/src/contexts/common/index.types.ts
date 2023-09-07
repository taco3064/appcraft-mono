import type { HierarchyData } from '~appcraft/services';

//* Variables
export type BaseOption = {
  value: string;
  primary: string;
  secondary: string;
};

//* Methods
export type WidgetViewHandler = (data: HierarchyData<string>) => void;
