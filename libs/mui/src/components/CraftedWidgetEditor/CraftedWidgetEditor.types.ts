import type * as Appcraft from '@appcraft/types';

import type { FixedT } from '../../contexts';
import type { WidgetAddDialogProps } from '../WidgetAddDialog';
import type { WidgetNodeProps } from '../WidgetNode';

export interface NodeSelectEvent {
  item: Appcraft.WidgetOptions;
  type: Appcraft.NodeType;
  path: string;
  index: number;
}

export type LazyWidgetNodesProps<A> = Omit<
  WidgetNodeProps<Appcraft.WidgetOptions>,
  'item' | 'structure' | 'onActive'
> & {
  onActive: A;
};

export interface CraftedWidgetEditorProps
  extends Pick<WidgetAddDialogProps, 'renderWidgetTypeSelection'> {
  defaultValues?: Record<string, unknown>;
  disableSelection?: boolean;
  fetchOptions: Record<'parser' | 'nodes', Appcraft.FetchOptions>;
  fixedT?: FixedT;
  widget?: Appcraft.NodeWidget;

  onWidgetChange: (e: Appcraft.NodeWidget | null) => void;
}
