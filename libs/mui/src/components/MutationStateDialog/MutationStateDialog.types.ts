import type { DialogProps } from '@mui/material/Dialog';
import type { RootNodeWidget } from '@appcraft/types';

import type { FixedT } from '../../contexts';

export type TabValue = keyof RootNodeWidget['state'];

export interface MutationStateDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  ct: FixedT;
  values: RootNodeWidget;
  onConfirm: (e: RootNodeWidget) => void;
}
