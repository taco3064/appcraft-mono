import { lazy, useEffect, useMemo, useRef, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import type { FetchTypeDefinition } from '../index.types';

export const useLazyDefinition = <R, D extends Appcraft.PropTypesDef>(
  options: Appcraft.TypesParseOptions | undefined,
  fetchTypeDefinition: FetchTypeDefinition<D>,
  renderer: Appcraft.LazyRenderer<D, R>
) => {
  const stringify = JSON.stringify(options || {});
  const ref = useRef({ fetchTypeDefinition, renderer });
  const [fetchPromise, setFetchPromise] = useState<Promise<D | undefined>>();

  useEffect(() => {
    const { fetchTypeDefinition } = ref.current;

    const { typeFile, typeName, mixedTypes, collectionPath } =
      JSON.parse(stringify);

    setFetchPromise(
      !typeFile || !typeName
        ? Promise.resolve(undefined)
        : fetchTypeDefinition({
            typeFile,
            typeName,
            mixedTypes,
            collectionPath,
          })
    );
  }, [stringify]);

  return useMemo(
    () =>
      lazy(async () => {
        const { renderer } = ref.current;
        const fetchData = await fetchPromise;

        return {
          default: (props: R) => renderer({ ...props, fetchData }),
        };
      }),
    [fetchPromise]
  );
};
