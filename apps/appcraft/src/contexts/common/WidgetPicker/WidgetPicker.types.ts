import TextField from '@mui/material/TextField';
import type { ComponentProps } from 'react';

import type { HierarchyData } from '~appcraft/services';

export type WidgetViewHandler = (data: HierarchyData<string>) => void;

export interface WidgetPickerProps
  extends Omit<
    ComponentProps<typeof TextField>,
    | 'InputProps'
    | 'SelectProps'
    | 'children'
    | 'select'
    | 'defaultValue'
    | 'value'
    | 'onChange'
  > {
  exclude?: string[];
  targets?: string[];
  value?: string;
  onChange?: (value: string) => void;
  onView?: WidgetViewHandler;
}
