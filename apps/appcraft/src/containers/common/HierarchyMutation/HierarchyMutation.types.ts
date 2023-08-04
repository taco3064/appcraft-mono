import type { HierarchyData } from '~appcraft/services';

export interface HierarchyMutationProps {
  data: HierarchyData<string>;
  onMoveToSuperiorGroup?: () => void;
  onSuccess?: () => void;
}
