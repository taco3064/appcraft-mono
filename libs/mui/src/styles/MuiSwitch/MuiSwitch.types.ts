import type { SwitchProps } from '@mui/material/Switch';

export interface WidgetNodeSwitchProps
  extends Omit<SwitchProps, 'defaultChecked' | 'checked' | 'onChange'> {
  value: 'nodes' | 'events';
  onChange: (value: 'nodes' | 'events') => void;
}
