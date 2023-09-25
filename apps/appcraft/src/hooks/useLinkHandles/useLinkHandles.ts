import { useMemo } from 'react';
import type { LinkHandlesHook, LinkOptions } from './useLinkHandles.types';

export const useLinkHandles: LinkHandlesHook = (layouts) => {
  const options = useMemo(
    () =>
      layouts.reduce<LinkOptions[]>((result, { id, links }) => {
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
      }, []),
    [layouts]
  );

  console.log(options);

  return [{ options }];
};
