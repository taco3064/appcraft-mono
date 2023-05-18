import { initialize, widgets } from './assets/json/mui-widgets.json';
import type { Mui } from './widgets';

export * from './services';
export * from './widgets';

export const MUI_WIDGETS = {
  initialize,
  widgets,
} as unknown as Mui;
