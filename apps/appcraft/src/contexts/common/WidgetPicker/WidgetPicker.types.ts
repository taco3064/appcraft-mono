import TextField from '@mui/material/TextField';
import type { ComponentProps } from 'react';

import type { WidgetViewHandler } from '../index.types';

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
