import type { MainWidget } from '@appcraft/types';
import type { ReactElement } from 'react';
import type { IconProps } from '@mui/material/Icon';

//* Variables
export type WidgetStates = MainWidget['state'];
export type StateIcon = Record<keyof WidgetStates, ReactElement<IconProps>>;

//* Component Props
export interface StateViewerProps {
  widget: MainWidget;
}
