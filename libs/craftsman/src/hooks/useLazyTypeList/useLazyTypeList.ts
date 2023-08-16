import { lazy, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import type { FetchTypeDefinition } from './useLazyTypeList.types';

export const useLazyTypeList = <R>(
  options: Appcraft.TypesParseOptions,
  fetchTypeDefinition: FetchTypeDefinition,
  renderer: Appcraft.LazyRenderer<Appcraft.StructureProp, R>
) => {
  const { typeFile, typeName, mixedTypes, collectionPath } = options;
  const fetchRef = useRef(fetchTypeDefinition);
  const renderRef = useRef(renderer);

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = await fetchRef.current({
          typeFile,
          typeName,
          mixedTypes,
          collectionPath,
        });

        return {
          default: (props: R) => renderRef.current({ ...props, fetchData }),
        };
      }),
    [typeFile, typeName, mixedTypes, collectionPath]
  );
};
