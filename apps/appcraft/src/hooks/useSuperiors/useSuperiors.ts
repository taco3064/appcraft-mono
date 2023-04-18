import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getHierarchyNames } from '~appcraft/services';
import type * as Types from './useSuperiors.types';

const useSuperiors: Types.SuperiorsHook = (category, itemId) => {
  const { query } = useRouter();
  const superiors = (query.superiors as string)?.split('-') || [];

  return [
    useQuery({
      refetchOnWindowFocus: false,
      queryFn: getHierarchyNames,
      queryKey: [category, itemId ? superiors.concat(itemId) : superiors],
    }),

    superiors,
  ];
};

export default useSuperiors;
