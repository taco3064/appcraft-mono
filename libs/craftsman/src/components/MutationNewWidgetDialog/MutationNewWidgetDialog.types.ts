import type * as Appcraft from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';

import type { FixedT } from '../../contexts';

export type WidgetTypeChangeHandler = (
  e: Pick<Appcraft.NodeWidget, 'type' | 'typeFile' | 'typeName'>
) => void;

export interface MutationNewWidgetDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  ct: FixedT;
  disablePlaintext?: boolean;
  onConfirm: (e: Appcraft.WidgetOptions) => void;
}
