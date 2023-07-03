import { lazy, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getTypeDefinition } from '../../services';

const useLazyTypeList = <R>(
  fetchOptions: Appcraft.FetchOptions,
  {
    typeFile,
    typeName,
    mixedTypes,
    collectionPath,
  }: Appcraft.TypesParseOptions,
  renderer: Appcraft.LazyRenderer<Appcraft.StructureProp, R>
) => {
  const renderRef = useRef(renderer);

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = await getTypeDefinition(fetchOptions, {
          typeFile,
          typeName,
          mixedTypes,
          collectionPath,
        });

        return {
          default: (props: R) => renderRef.current({ ...props, fetchData }),
        };
      }),
    [fetchOptions, typeFile, typeName, mixedTypes, collectionPath]
  );
};

export default useLazyTypeList;
