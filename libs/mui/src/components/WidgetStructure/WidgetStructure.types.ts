import type { NodeWidget } from '@appcraft/types';

import type { ActionElement, Collapsable } from '../CraftedTypeEditor';
import type { ChangeHandler, EditorProviderProps } from '../../contexts';
import type { WidgetAddDialogProps } from '../WidgetAddDialog';

export type WidgetStructureProps<A extends ActionElement> = Collapsable<
  Pick<WidgetAddDialogProps, 'renderWidgetTypeSelection'> & {
    fixedT?: EditorProviderProps['fixedT'];
    widget?: NodeWidget;
    onWidgetChange: ChangeHandler;
    onWidgetSelect: (widget: NodeWidget) => void;
  },
  A
>;
