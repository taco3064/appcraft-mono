import type * as Appcraft from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

import type { FixedT } from '../../contexts';

type ChangeEventField = 'type' | 'typeFile' | 'typeName';

export interface WidgetAddDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  disablePlaintext?: boolean;
  fixedT?: FixedT;
  onConfirm: (e: Appcraft.WidgetOptions) => void;

  renderWidgetTypeSelection: (options: {
    onChange: (e: Pick<Appcraft.NodeWidget, ChangeEventField>) => void;
  }) => ReactNode;
}
