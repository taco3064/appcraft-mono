import _get from 'lodash.get';
import _set from 'lodash.set';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getPropPath } from '../../hooks';
import type { WidgetMutationHook } from './useWidgetMutation.types';

const useWidgetMutation: WidgetMutationHook = (
  widget,
  isMultiChildren,
  paths,
  onWidgetChange
) => {
  const [todoPath, setTodoPath] = useState<string | null>(null);

  const [editedWidget, setEditedWidget] =
    useState<Appcraft.WidgetOptions | null>(null);

  const items = useMemo(() => {
    const target = _get(widget, paths || []);

    return !target ? [] : Array.isArray(target) ? target : [target];
  }, [widget, paths]);

  return [
    { editedWidget, todoPath },

    {
      editing: (e: Appcraft.WidgetOptions | null) => {
        setEditedWidget(e);
        setTodoPath(null);
      },

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
          setEditedWidget(e);
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
                    : items.map((item) => (item !== editedWidget ? item : e))
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

      todo: (e) => {
        const index = e.lastIndexOf('events');
        const widgetPaths = e.slice(0, index);

        setTodoPath(getPropPath(e.slice(index + 1)));

        setEditedWidget(
          !widgetPaths.length
            ? widget
            : (_get(widget, widgetPaths) as Appcraft.NodeWidget)
        );
      },
    },
  ];
};

export default useWidgetMutation;
