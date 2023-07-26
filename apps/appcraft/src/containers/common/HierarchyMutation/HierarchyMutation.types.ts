import type { HierarchyData } from '~appcraft/services';

export interface HierarchyMutationProps {
  data: HierarchyData<string>;
  onSuccess?: () => void;
}
