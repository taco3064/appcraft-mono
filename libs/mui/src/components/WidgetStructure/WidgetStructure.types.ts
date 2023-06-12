import type { NodeWidget } from '@appcraft/types';

import type { ActionElement, Collapsable } from '../CraftedTypeEditor';
import type { ChangeHandler, EditorProviderProps } from '../../contexts';
import type { WidgetAddDialogProps } from '../WidgetAddDialog';

export type WidgetStructureProps<A extends ActionElement> = Collapsable<
  Pick<WidgetAddDialogProps, 'renderWidgetTypeSelection'> & {
    fixedT?: EditorProviderProps<NodeWidget>['fixedT'];
    widget?: NodeWidget;
    onWidgetChange: ChangeHandler<NodeWidget>;
    onWidgetSelect: (widget: NodeWidget) => void;
  },
  A
>;
