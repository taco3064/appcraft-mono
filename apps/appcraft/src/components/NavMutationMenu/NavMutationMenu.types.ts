import type { Navigation } from '~appcraft/hooks';
import type { NavMutationButtonProps } from '../NavMutationButton';

//* Component Props
export interface NavMutationMenuProps {
  pageOptions: NavMutationButtonProps['options'];
  data: Navigation;
  onChange: (data: Navigation) => void;
  onRemove: () => void;
}
