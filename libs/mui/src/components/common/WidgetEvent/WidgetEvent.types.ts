import type { PropPaths } from '../../../utils';

export interface WidgetEventProps {
  completePaths: PropPaths;
  elementName: string;
  path: string;
  onActive: (paths: PropPaths) => void;
}
