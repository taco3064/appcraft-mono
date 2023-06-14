import axios from 'axios';
import { ReactNode, lazy, useMemo, useRef } from 'react';
import type { WidgetOptions } from '@appcraft/types';

import type { FetchOptions, ParseOptions } from './useLazyWidgetNodes.types';

const useLazyWidgetNodes = <D, R extends Record<string, unknown>>(
  fetchOptions: FetchOptions,
  items: WidgetOptions[],
  renderFn: (
    options: R & { fetchData: D; widgets: WidgetOptions[] }
  ) => JSX.Element
) => {
  const renderRef = useRef(renderFn);

  return useMemo(
    () =>
      lazy(async () => {
        const targets = items.reduce<ParseOptions[]>((result, item) => {
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
