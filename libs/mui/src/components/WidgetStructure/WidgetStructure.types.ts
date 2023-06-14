import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

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

    children: (options: {
      selected: Appcraft.NodeWidget;
      onBackToStructure: () => void;
      onSelectedChange: ChangeHandler<Appcraft.NodeWidget>;
    }) => ReactNode;
  },
  A
>;

export interface NodeSelectEvent {
  item: Appcraft.WidgetOptions;
  type: Appcraft.NodeType;
  path: string;
  index: number;
}
