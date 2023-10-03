import type { BaseOption } from '../usePathOptions';
import type { NavHierarchy, Navigation } from '../useNavValues';

//* Variables
export type NavOption = BaseOption<{ nav: string; page: string }>;

//* Methods
export type GetNavOptionsFn = (
  hierarchies: NavHierarchy[],
  items: Navigation[]
) => NavOption[];

//* Custom Hooks
export type NavOptionsHook = (pages: Navigation[]) => NavOption[];
