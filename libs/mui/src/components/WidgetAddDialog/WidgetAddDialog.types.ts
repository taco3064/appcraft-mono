import type { ChangeEventHandler } from 'react';
import type { DialogProps } from '@mui/material/Dialog';
import type { NodeWidget } from '@appcraft/types';

import type { EditorProviderProps } from '../../contexts';

export type WidgetInfo = Pick<NodeWidget, 'type' | 'description'>;

export interface WidgetAddDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  fixedT?: EditorProviderProps<NodeWidget>['fixedT'];
  onConfirm: (e: WidgetInfo) => void;

  renderWidgetTypeSelection: (
    onChange: ChangeEventHandler<HTMLInputElement>
  ) => JSX.Element;
}
