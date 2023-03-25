import type {
  HierarchyData,
  SearchParams,
} from '~data-forge/services/hierarchy';

export { HierarchyData };

export type SearchHierarchyService = (
  category: string,
  params: SearchParams
) => Promise<HierarchyData<string>[]>;

export type AddHierarchyService = (
  data: Omit<HierarchyData, '_id'>
) => Promise<HierarchyData<string>>;
