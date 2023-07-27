import _get from 'lodash/get';
import _set from 'lodash/set';
import { useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getPropPath, removeState, resortState } from '../../utils';
import type { PropPaths } from '../../utils';
import type { WidgetMutationHook } from './useWidgetMutation.types';

const useWidgetMutation: WidgetMutationHook = (widget, onWidgetChange) => {
  const [editedPaths, setEditedPaths] = useState<PropPaths | null>(null);
  const [todoPath, setTodoPath] = useState<string | null>(null);

  return [
    {
      todoPath,
      widgetPath: getPropPath(editedPaths || []),

      editedWidget: !editedPaths
        ? null
        : editedPaths.length
        ? _get(widget, editedPaths)
        : widget,
    },

    {
      add: (e, type, paths) => {
        if (!paths.length) {
          onWidgetChange({ ...e, state: {} } as Appcraft.RootNodeWidget);
        } else if (type === 'element') {
          onWidgetChange({ ..._set(widget, paths, e) });
        } else {
          const target = _get(widget, paths) || [];

          onWidgetChange({ ..._set(widget, paths, [...target, e]) });
        }
      },

      editing: (e) => {
        setEditedPaths(e);
        setTodoPath(null);
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
          const index = Number.parseInt(e.pop() as string, 10);
          const basePath = getPropPath(e);
          const target: Appcraft.NodeWidget[] = _get(widget, e) || [];

          target.splice(index, 1);

          onWidgetChange({
            ..._set(widget, e, target),
            state: removeState(
              'nodes',
              widget.state || {},
              basePath,
              index,
              target.length
            ),
          });
        }
      },

      resort: (paths, dragIndex, hoverIndex) => {
        const target = _get(widget, paths);

        if (Array.isArray(target)) {
          const dragItem = target[dragIndex];

          target.splice(dragIndex, 1);
          target.splice(hoverIndex, 0, dragItem);

          onWidgetChange({
            ..._set(widget, paths, [...target]),
            state: resortState(
              'nodes',
              widget.state || {},
              getPropPath(paths),
              [dragIndex, hoverIndex],
              target.length
            ),
          });
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
