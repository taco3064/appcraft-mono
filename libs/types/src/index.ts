import mui from './assets/json/mui-widgets.json';
import type { Mui } from './widgets';

export * from './services';
export * from './widgets';

export const MUI_WIDGETS = mui as unknown as Mui;
