import type * as Appcraft from '@appcraft/types';

import type { ActionElement, Collapsable } from '../CraftedTypeEditor';
import type { ChangeHandler, FixedT } from '../../contexts';
import type { FetchOptions } from '../CraftedTypeEditor';
import type { WidgetAddDialogProps } from '../WidgetAddDialog';

export type ParseOptions = Pick<
  Appcraft.TypesParseOptions,
  'typeFile' | 'typeName'
>;

export type WidgetStructureProps<A extends ActionElement> = Collapsable<
  Pick<WidgetAddDialogProps, 'renderWidgetTypeSelection'> & {
    fixedT?: FixedT;
    nodes: FetchOptions;
    widget?: Appcraft.NodeWidget;
    onWidgetChange: ChangeHandler<Appcraft.NodeWidget>;
    onWidgetSelect: (widget: Appcraft.NodeWidget) => void;
  },
  A
>;

export interface NodeSelectEvent {
  item: Appcraft.WidgetOptions;
  type: Appcraft.NodeType;
  path: string;
  index: number;
}
