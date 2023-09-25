import { useMemo } from 'react';
import type { LinkHandlesHook, LinkOptions } from './useLinkHandles.types';

export const useLinkHandles: LinkHandlesHook = (layouts) => {
  const options = useMemo(
    () =>
      layouts.reduce<LinkOptions[]>((result, { id, links }) => {
        result.push(
          ...Object.entries(links || {}).map(
            ([todoPath, { alias, todoName, widgetPaths }]) => ({
              layoutid: id,
              alias,
              todoName,
              todoPath,
              nodePaths: widgetPaths,
              outputs: [],
            })
          )
        );

        return result;
      }, []),
    [layouts]
  );

  return [{ options }];
};
