import mui from './assets/json/mui-widgets.json';
import type { Mui } from './widgets';

export * from './services';
export * from './widgets';

export const MUI_WIDGETS = {
  initialize: mui.initialize,
  widgets: mui.widgets,
} as unknown as Mui;
