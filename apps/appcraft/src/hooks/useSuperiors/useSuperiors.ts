import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getHierarchyNames } from '~appcraft/services';
import type * as Types from './useSuperiors.types';

const useSuperiors: Types.SuperiorsHook = (category, itemId) => {
  const { query } = useRouter();
  const superiors = (query.superiors as string)?.split('-') || [];

  const { data: names } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: getHierarchyNames,
    queryKey: [category, itemId ? superiors.concat(itemId) : superiors],
  });

  return {
    names,
    superiors,

    breadcrumbs: superiors.map((id, i) => ({
      text: names[id],
      url: {
        pathname: `/${category}`,
        query: {
          superiors: superiors.slice(0, i + 1),
        },
      },
    })),
  };
};

export default useSuperiors;
