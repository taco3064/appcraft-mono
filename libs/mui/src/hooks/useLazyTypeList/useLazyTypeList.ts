import axios from 'axios';
import { lazy, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import { StructureType, getTypeDefinition } from '../../services';

const useLazyTypeList = <R>(
  fetchOptions: Appcraft.FetchOptions,
  {
    typeFile,
    typeName,
    mixedTypes,
    collectionPath,
  }: Appcraft.TypesParseOptions,
  version: string | undefined,
  renderer: Appcraft.LazyRenderer<StructureType, R>
) => {
  const renderRef = useRef(renderer);

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = await getTypeDefinition(
          fetchOptions,
          {
            typeFile,
            typeName,
            mixedTypes,
            collectionPath,
          },
          version
        );

        return {
          default: (props: R) => renderRef.current({ ...props, fetchData }),
        };
      }),
    [fetchOptions, typeFile, typeName, mixedTypes, collectionPath, version]
  );
};

export default useLazyTypeList;
