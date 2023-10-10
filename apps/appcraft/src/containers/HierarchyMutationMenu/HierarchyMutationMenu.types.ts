import type { HierarchyData } from '~appcraft/services';

export interface HierarchyMutationMenuProps {
  data: HierarchyData<string>;
  onMoveToSuperiorGroup?: () => void;
  onSuccess?: (type: 'update' | 'remove') => void;
}
