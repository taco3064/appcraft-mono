import axios from 'axios';
import { lazy, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './useLazyWidgetNodes.types';

const useLazyWidgetNodes = <D, R>(
  fetchOptions: Appcraft.FetchOptions,
  items: Appcraft.WidgetOptions[],
  renderFn: Types.RenderFn<D, R>
) => {
  const renderRef = useRef(renderFn);

  return useMemo(
    () =>
      lazy(async () => {
        const targets = items.reduce<Types.ParseOptions[]>((result, item) => {
          const { typeFile = null, typeName = null } =
            item.category === 'node' ? item : {};

          if (typeFile && typeName) {
            result.push({ typeFile, typeName });
          }

          return result;
        }, []);

        const { data: fetchData } =
          (targets.length &&
            (await axios({ ...fetchOptions, data: targets }))) ||
          {};

        return {
          default: (props: R) =>
            renderRef.current({ ...props, fetchData, widgets: items }),
        };
      }),
    [fetchOptions, items, renderRef]
  );
};

export default useLazyWidgetNodes;
