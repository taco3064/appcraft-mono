import { lazy, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import type { FetchTypeDefinition } from './useLazyTypeList.types';

const useLazyTypeList = <R>(
  {
    typeFile,
    typeName,
    mixedTypes,
    collectionPath,
  }: Appcraft.TypesParseOptions,
  fetchTypeDefinition: FetchTypeDefinition,
  renderer: Appcraft.LazyRenderer<Appcraft.StructureProp, R>
) => {
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

export default useLazyTypeList;
