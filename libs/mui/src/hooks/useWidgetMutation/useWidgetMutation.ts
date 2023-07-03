import _get from 'lodash.get';
import _set from 'lodash.set';
import { useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getPropPath } from '../../hooks';
import type { PropPaths } from '../../contexts';
import type { WidgetMutationHook } from './useWidgetMutation.types';

const useWidgetMutation: WidgetMutationHook = (widget, onWidgetChange) => {
  const [editedPaths, setEditedPaths] = useState<PropPaths | null>(null);
  const [todoPath, setTodoPath] = useState<string | null>(null);

  return [
    {
      editedWidget: !editedPaths
        ? null
        : editedPaths.length
        ? _get(widget, editedPaths)
        : widget,

      todoPath,
    },

    {
      editing: (e) => {
        setEditedPaths(e);
        setTodoPath(null);
      },

      add: (e, type, paths) => {
        if (!paths.length) {
          onWidgetChange({ ...e, construct: {} } as Appcraft.RootNodeWidget);
        } else if (type === 'element') {
          onWidgetChange({ ..._set(widget, paths, e) });
        } else {
          const target = _get(widget, paths) || [];

          onWidgetChange({ ..._set(widget, paths, [...target, e]) });
        }
      },

      modify: (e) => {
        if (editedPaths) {
          onWidgetChange(
            !editedPaths.length
              ? (e as Appcraft.RootNodeWidget)
              : { ..._set(widget, editedPaths, e) }
          );
        }
      },

      remove: (e) => {
        const isTargetNodes = typeof e[e.length - 1] === 'number';

        if (!e.length) {
          onWidgetChange(null);
        } else if (!isTargetNodes) {
          onWidgetChange({ ..._set(widget, e, undefined) });
        } else {
          const index = e.pop();
          const target = _get(widget, e);

          target.splice(index, 1);
          onWidgetChange({ ..._set(widget, e, target) });
        }
      },

      todo: (e) => {
        const index = e.lastIndexOf('events');
        const widgetPaths = e.slice(0, index);

        setEditedPaths(widgetPaths);
        setTodoPath(getPropPath(e.slice(index + 1)));
      },
    },
  ];
};

export default useWidgetMutation;
