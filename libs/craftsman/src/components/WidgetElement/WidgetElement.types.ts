import type * as Appcraft from '@appcraft/types';

import type { FixedT } from '../../contexts';
import type { PathsChangeHandler, SortableDndMoveHandler } from '../../hooks';
import type { PropPaths } from '../../utils';

export type MixedWidget = Appcraft.PlainTextWidget & Appcraft.NodeWidget;

export interface WidgetElementProps<I extends Appcraft.WidgetOptions> {
  basePaths: PropPaths;
  ct: FixedT;
  index: number;
  item: I;
  event: I extends Appcraft.NodeWidget ? string[] : undefined;
  node: I extends Appcraft.NodeWidget ? Appcraft.ChildNodes : undefined;
  superiorNodeType: Appcraft.NodeType;

  onClick: (paths: PropPaths) => void;
  onDndMove: SortableDndMoveHandler;
  onEventActive: (paths: PropPaths) => void;
  onNodeActive: PathsChangeHandler;
  onRemove: (paths: PropPaths) => void;
}
