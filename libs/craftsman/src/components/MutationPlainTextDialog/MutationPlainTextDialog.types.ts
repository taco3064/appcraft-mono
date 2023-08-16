import type * as Appcraft from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';

export interface MutationPlainTextDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  values?: Appcraft.PlainTextWidget;
  onConfirm: (e: Appcraft.PlainTextWidget) => void;
}
