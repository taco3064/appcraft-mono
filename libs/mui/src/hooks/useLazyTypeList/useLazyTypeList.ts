import axios from 'axios';
import { lazy, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

const useLazyTypeList = <D, R>(
  fetchOptions: Appcraft.FetchOptions,
  {
    typeFile,
    typeName,
    mixedTypes,
    collectionPath,
  }: Appcraft.TypesParseOptions,
  renderer: Appcraft.LazyRenderer<D, R>
) => {
  const renderRef = useRef(renderer);

  return useMemo(
    () =>
      lazy(async () => {
        const { data: fetchData } = !(typeFile && typeName)
          ? { data: null }
          : await axios({
              ...fetchOptions,
              data: {
                typeFile,
                typeName,
                mixedTypes,
                collectionPath,
              },
            });

        return {
          default: (props: R) => renderRef.current({ ...props, fetchData }),
        };
      }),
    [fetchOptions, typeFile, typeName, mixedTypes, collectionPath]
  );
};

export default useLazyTypeList;
