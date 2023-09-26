import type { BaseOption } from '../usePathOptions';
import type { NavHierarchy, Navigation } from '../useNavValues';

//* Methods
export type GetNavOptionsFn = (
  hierarchies: NavHierarchy[],
  items: Navigation[]
) => BaseOption[];

//* Custom Hooks
export type NavOptionsHook = (pages: Navigation[]) => BaseOption[];
