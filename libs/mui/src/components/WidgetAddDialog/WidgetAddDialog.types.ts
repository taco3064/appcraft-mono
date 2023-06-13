import type { DialogProps } from '@mui/material/Dialog';
import type { NodeWidget } from '@appcraft/types';

import type { FixedT } from '../../contexts';

type ChangeEventField = 'type' | 'typeFile' | 'typeName';

export interface WidgetAddDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  fixedT?: FixedT;
  onConfirm: (e: NodeWidget) => void;

  renderWidgetTypeSelection: (
    onChange: (e: Pick<NodeWidget, ChangeEventField>) => void
  ) => JSX.Element;
}
