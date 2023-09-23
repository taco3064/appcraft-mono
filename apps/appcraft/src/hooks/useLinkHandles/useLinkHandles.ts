import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { findConfig } from '~appcraft/services';
import type { LinkHandlesHook, LinkOptions } from './useLinkHandles.types';
import type { PageData } from '../usePageValues';

export const useLinkHandles: LinkHandlesHook = (enabled, pageid) => {
  const { data } = useQuery({
    enabled,
    queryKey: [pageid],
    queryFn: findConfig<PageData>,
    refetchOnWindowFocus: false,
  });

  const options = useMemo(
    () =>
      (data?.content?.layouts || []).reduce<LinkOptions[]>(
        (result, { id, links }) => {
          result.push(
            ...(links?.map((todoPath) => {
              const todoName = todoPath
                .substring(todoPath.search(/(^todos|\.todos)\./g))
                .replace(/(^todos|\.todos)\./, '');

              return {
                layoutid: id,
                todoName,
                todoPath,
                outputs: [],
              };
            }) || [])
          );

          return result;
        },
        []
      ),
    [data?.content?.layouts]
  );

  console.log(options);

  return [{ options }];
};
