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
export interface ExplorerNavItemProps {
  active: string;
  basename?: string;
  options: Navigation;
  superior?: string;

  onSubMenuPopover?: (e?: ExpandedNav) => void;
}
