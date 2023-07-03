import _get from 'lodash.get';
import _set from 'lodash.set';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import type { WidgetMutationHook } from './useWidgetMutation.types';

const useWidgetMutation: WidgetMutationHook = (
  widget,
  isMultiChildren,
  paths,
  onWidgetChange
) => {
  const [selected, setSelected] = useState<Appcraft.WidgetOptions | null>(null);
  const target = _get(widget, paths || []);

  const items = useMemo(
    () => (!target ? [] : Array.isArray(target) ? target : [target]),
    [target]
  );

  return [
    selected,
    {
      add: (e) =>
        onWidgetChange(
          (!paths?.length
            ? { ...e, construct: {} }
            : {
                ..._set(widget, paths, !isMultiChildren ? e : [...items, e]),
              }) as Appcraft.RootNodeWidget
        ),

      modify: (e) => {
        if (e.category === 'node') {
          setSelected(e);
        }

        onWidgetChange(
          !paths?.length
            ? (e as Appcraft.RootNodeWidget)
            : {
                ..._set(
                  widget,
                  paths,
                  !isMultiChildren
                    ? e
                    : items.map((item) => (item !== selected ? item : e))
                ),
              }
        );
      },

      remove: (e) =>
        onWidgetChange(
          e === widget || !paths?.length
            ? null
            : {
                ..._set(
                  widget,
                  paths,
                  !isMultiChildren
                    ? undefined
                    : items.filter((item) => item !== e)
                ),
              }
        ),

      select: setSelected,
    },
  ];
};

export default useWidgetMutation;
