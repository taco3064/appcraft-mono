import _get from 'lodash.get';
import _set from 'lodash.set';
import { useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import type { WidgetMutationHook } from './useWidgetMutation.types';

const useWidgetMutation: WidgetMutationHook = (
  widget,
  isMultiChildren,
  paths,
  onWidgetChange
) => {
  const [selected, setSelected] = useState<Appcraft.NodeWidget | null>(null);
  const target = _get(widget, paths || []) || [];
  const items = Array.isArray(target) ? target : [target];

  return [
    selected,
    {
      onWidgetSelect: setSelected,

      onWidgetAdd: (e) =>
        onWidgetChange(
          (!paths?.length
            ? e
            : {
                ..._set(widget, paths, !isMultiChildren ? e : [...items, e]),
              }) as Appcraft.NodeWidget
        ),

      onWidgetModify: (e) =>
        onWidgetChange(
          !paths?.length
            ? (e as Appcraft.NodeWidget)
            : {
                ..._set(
                  widget,
                  paths,
                  !isMultiChildren
                    ? e
                    : items.map((item) => (item !== selected ? item : e))
                ),
              }
        ),

      onWidgetRemove: (e) =>
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
    },
  ];
};

export default useWidgetMutation;
