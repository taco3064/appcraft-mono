import type * as Appcraft from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';

export type WidgetTypeChangeHandler = (
  e: Pick<Appcraft.NodeWidget, 'type' | 'typeFile' | 'typeName'>
) => void;

export interface MutationNewWidgetDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  disablePlaintext?: boolean;
  onConfirm: (e: Appcraft.EntityWidgets) => void;
}
