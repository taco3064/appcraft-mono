import type { QueryFunction } from '@tanstack/react-query';

import type {
  HierarchyData,
  SearchParams,
} from '~data-forge/services/hierarchy';

export type { HierarchyData, SearchParams };

export type SearchHierarchyService = QueryFunction<
  HierarchyData<string>[],
  readonly [string, string, string]
>;

export type AddHierarchyService = (
  data: Omit<HierarchyData, '_id'>
) => Promise<HierarchyData<string>>;

export type UpdateHierarchyService = (
  data: HierarchyData<string>
) => Promise<HierarchyData<string>>;
