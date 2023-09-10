import { Fragment, lazy, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import type { FetchTypeDefinition } from '../index.types';

export const useLazyDefinition = <R, D extends Appcraft.PropTypesDef>(
  options: Appcraft.TypesParseOptions | undefined,
  fetchTypeDefinition: FetchTypeDefinition<D>,
  renderer: Appcraft.LazyRenderer<D, R>
) => {
  const stringify = JSON.stringify(options || {});

  const ref = useRef({
    fetch: fetchTypeDefinition,
    render: renderer,
  });

  return useMemo(
    () =>
      lazy(async () => {
        const { typeFile, typeName, mixedTypes, collectionPath } =
          JSON.parse(stringify);

        const { fetch, render } = ref.current;

        const fetchData =
          !typeFile || !typeName
            ? undefined
            : await fetch({
                typeFile,
                typeName,
                mixedTypes,
                collectionPath,
              });

        return {
          default: (props: R) => render({ ...props, fetchData }),
        };
      }),
    [stringify]
  );
};
