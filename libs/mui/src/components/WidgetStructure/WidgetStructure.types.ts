import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

import type { ActionElement, Collapsable } from '../CraftedTypeEditor';
import type { ChangeHandler, FixedT } from '../../contexts';
import type { WidgetAddDialogProps } from '../WidgetAddDialog';
import type { WidgetNodeProps } from '../WidgetNode';

export interface NodeSelectEvent {
  item: Appcraft.WidgetOptions;
  type: Appcraft.NodeType;
  path: string;
  index: number;
}

export type LazyWidgetNodesProps = Omit<
  WidgetNodeProps<Appcraft.WidgetOptions>,
  'item' | 'structure' | 'onSelect'
> & {
  onSelect: (e: NodeSelectEvent) => void;
};

export type WidgetStructureProps<A extends ActionElement> = Collapsable<
  Pick<WidgetAddDialogProps, 'renderWidgetTypeSelection'> & {
    fetchOptions: Appcraft.FetchOptions;
    fixedT?: FixedT;
    widget?: Appcraft.NodeWidget;
    onWidgetChange: ChangeHandler<Appcraft.NodeWidget>;

    renderWidgetEditor: (options: {
      selected: Appcraft.NodeWidget;
      onBackToStructure: () => void;
      onSelectedChange: ChangeHandler<Appcraft.NodeWidget>;
    }) => ReactNode;
  },
  A
>;
