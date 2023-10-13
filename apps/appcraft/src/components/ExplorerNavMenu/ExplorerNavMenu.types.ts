import type { Website } from '@appcraft/types';
import type { Navigation } from '~appcraft/hooks';

//* Component Props
export interface ExplorerNavMenuProps {
  active: string;
  anchor: Website['navAnchor'];
  basename?: string;
  open: boolean;
  items: Navigation[];
  scale?: number;
}
