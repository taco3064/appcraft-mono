import type { NodeType } from '@appcraft/types';

import type { PathsChangeHandler } from '../../../hooks';
import type { PropPaths } from '../../../utils';

export interface WidgetNodeProps {
  completePaths: PropPaths;
  defined: boolean;
  elementName: string;
  path: string;
  type: NodeType;
  onActive: PathsChangeHandler;
}
