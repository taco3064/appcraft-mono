import type { Navigation } from '~appcraft/hooks';

//* Component Props
export interface NavMutationMenuProps {
  data: Navigation;
  onChange: (data: Navigation) => void;
}
