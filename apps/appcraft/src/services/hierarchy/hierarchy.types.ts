import type { QueryFunction } from '@tanstack/react-query';
import type { HierarchyData, SearchParams } from '~types/hierarchy';

type SimpleData<U = undefined> = Omit<HierarchyData<U>, 'userid'>;

export type { SimpleData as HierarchyData, SearchParams };

export type SearchHierarchyService = QueryFunction<
  SimpleData<string>[],
  readonly [string, SearchParams]
>;

export type GetHierarchyNamesService = QueryFunction<
  Record<string, string>,
  [string, string[]]
>;

export type AddHierarchyService = (
  data: Omit<SimpleData, '_id'>
) => Promise<SimpleData<string>>;

export type UpdateHierarchyService = (
  data: SimpleData<string>
) => Promise<SimpleData<string>>;

export type RemoveHierarchyService = (
  data: SimpleData<string>
) => Promise<void>;
