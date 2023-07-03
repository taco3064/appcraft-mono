import type * as Appcraft from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';

import type { FixedT } from '../../contexts';

export interface PlainTextDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  ct: FixedT;
  values?: Appcraft.PlainTextWidget;
  onConfirm: (e: Appcraft.PlainTextWidget) => void;
}
