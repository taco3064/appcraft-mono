import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getHierarchyNames } from '~appcraft/services';
import type * as Types from './useHierarchyFilter.types';

export const useHierarchyFilter: Types.HierarchyFilterHook = (
  category,
  itemId
) => {
  const { query } = useRouter();
  const params = (query.superiors as string)?.split('-') || [];

  const { data: superiors } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: getHierarchyNames,
    queryKey: [category, itemId ? params.concat(itemId) : params],
  });

  return {
    keyword: query.keyword as string | undefined,
    superiors,

    breadcrumbs: Object.keys(superiors)
      .filter((id) => id !== itemId)
      .reduce(
        (result, id, i, arr) => [
          ...result,
          {
            text: superiors[id],
            url: {
              pathname: `/${category}`,
              query: {
                superiors: arr.slice(0, i + 1).join('-'),
              },
            },
          },
        ],
        []
      ),
  };
};
