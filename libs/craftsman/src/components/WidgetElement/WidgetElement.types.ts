import type * as Appcraft from '@appcraft/types';

import type { PathsChangeHandler } from '../../hooks';
import type { PropPaths } from '../../utils';

export type MixedWidget = Appcraft.PlainTextWidget & Appcraft.NodeWidget;

export interface WidgetElementProps<I extends Appcraft.EntityWidgets> {
  basePaths: PropPaths;
  disableRemove?: boolean;
  index: number;
  item: I;
  event: I extends Appcraft.NodeWidget ? string[] : undefined;
  node: I extends Appcraft.NodeWidget ? Appcraft.ChildNodes : undefined;
  superiorNodeType: Appcraft.NodeType;

  onClick: (paths: PropPaths) => void;
  onEventActive: (paths: PropPaths) => void;
  onNodeActive: PathsChangeHandler;
  onRemove: (paths: PropPaths) => void;
}
