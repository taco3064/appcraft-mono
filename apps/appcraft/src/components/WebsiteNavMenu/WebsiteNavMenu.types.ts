import type { Website } from '@appcraft/types';

import type { Navigation } from '~appcraft/hooks';

//* Variables
export type ExpandedNav = {
  anchorEl?: HTMLElement;
  pathname: string;
  routes: Navigation[];
  onClose: () => void;
};

//* Methods
export type GetMenuItemsFn = (
  options: Navigation[],
  superior?: string
) => Navigation[];

//* Component Props
export interface NavTabProps {
  basename?: string;
  options: Navigation;
  superior?: string;

  onSubMenuPopover?: (e?: ExpandedNav) => void;
}

export interface WebsiteNavMenuProps {
  anchor: Website['navAnchor'];
  basename?: string;
  open: boolean;
  items: Navigation[];
  scale?: number;
}
