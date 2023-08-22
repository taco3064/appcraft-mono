import _get from 'lodash/get';
import _set from 'lodash/set';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { removeState, resortState } from '../../utils';
import type { PropPaths } from '../../utils';
import type { WidgetMutationHook } from './useWidgetMutation.types';

export const useWidgetMutation: WidgetMutationHook = (
  widget,
  onWidgetChange
) => {
  const [editedPaths, setEditedPaths] = useState<PropPaths>();
  const [todoPath, setTodoPath] = useState<string>();

  return [
    {
      todoPath,
      widgetPath: ExhibitorUtil.getPropPath(editedPaths || []),

      editedWidget: !editedPaths
        ? null
        : editedPaths.length
        ? _get(widget, editedPaths)
        : widget,
    },

    {
      add: (e, type, paths) => {
        if (!paths.length) {
          onWidgetChange({ ...e, state: {} } as Appcraft.MainWidget);
        } else if (type === 'element') {
          onWidgetChange({ ..._set(widget, paths, e) });
        } else {
          const target = _get(widget, paths) || [];

          onWidgetChange({ ..._set(widget, paths, [...target, e]) });
        }
      },

      editing: (e) => {
        setEditedPaths(e);
        setTodoPath(undefined);
      },

      modify: (e) => {
        if (editedPaths) {
          onWidgetChange(
            !editedPaths.length
              ? (e as Appcraft.MainWidget)
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
          const basePath = ExhibitorUtil.getPropPath(e);
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

      resort: (paths, { active, over }) => {
        const target = _get(widget, paths);

        if (Array.isArray(target) && active.id !== over?.id) {
          const activeIndex = target.findIndex(({ id }) => id === active.id);
          const overIndex = target.findIndex(({ id }) => id === over?.id);
          const chidldren = arrayMove(target, activeIndex, overIndex);

          onWidgetChange({
            ..._set(widget, paths, chidldren),
            state: resortState(
              widget.state || {},
              ExhibitorUtil.getPropPath(paths),
              [activeIndex, overIndex],
              chidldren.length
            ),
          });
        }
      },

      todo: (e) => {
        const index = e.lastIndexOf('todos');
        const widgetPaths = e.slice(0, index);

        setEditedPaths(widgetPaths);
        setTodoPath(ExhibitorUtil.getPropPath(e.slice(index + 1)));
      },
    },
  ];
};
