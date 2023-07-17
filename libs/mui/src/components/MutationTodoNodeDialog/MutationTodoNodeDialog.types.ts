import type * as Appcraft from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

import type { FixedT } from '../../contexts';
import type { TodoState } from '../../utils';

export interface MutationTodoNodeDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  ct: FixedT;
  values?: TodoState;
  onConfirm: (e: Appcraft.WidgetTodo) => void;
  renderEditor: (todoConfig: Appcraft.ConfigOptions) => ReactNode;
}
