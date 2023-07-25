import type { ConfigOptions, RootNodeWidget } from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

import type { ChangeHandler, FixedT } from '../../contexts';

export interface MutationStateDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  ct: FixedT;
  typeFile?: string;
  values: RootNodeWidget;
  onConfirm: (e: RootNodeWidget) => void;

  renderEditor: (
    stateConfig: ConfigOptions,
    onStateChange: ChangeHandler<ConfigOptions>
  ) => ReactNode;
}
