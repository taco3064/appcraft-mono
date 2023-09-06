import _set from 'lodash/set';
import type { ComponentProps } from 'react';
import type { StateCategory } from '@appcraft/types';

import { getEventHandler, getPropPath } from '../../utils';
import { useHandles, useMutableHandles } from '../../contexts';
import type * as Types from './useComposerRender.types';

const sources: StateCategory[] = ['props', 'todos', 'nodes'];

function getProps<P>(
  ...[
    widget,
    { group, renderPaths = [] },
    { generate, getHandles },
  ]: Types.GetPropsArgs
) {
  const { onFetchData, onFetchWrapper, onOutputCollect } = getHandles<'todo'>();

  return sources.reduce((result, source) => {
    if (source === 'props') {
      Object.entries(widget[source] || {}).forEach(([propPath, value]) =>
        _set(result, propPath, value)
      );
    } else if (source === 'todos') {
      Object.entries(widget[source] || {}).forEach(([propPath, todos]) =>
        _set(
          result,
          propPath,
          getEventHandler(todos, {
            eventName: propPath,
            onFetchData,
            onFetchTodoWrapper: (todoid) => onFetchWrapper('todo', todoid),
            onOutputCollect,
          })
        )
      );
    } else if (source === 'nodes') {
      Object.entries(widget[source] || {}).forEach(([propPath, nodes]) =>
        _set(
          result,
          propPath,
          !Array.isArray(nodes)
            ? generate(nodes, {
                group,
                renderPaths: [...renderPaths, propPath],
              })
            : nodes.map((node, index) =>
                generate(node, {
                  group,
                  index,
                  renderPaths: [...renderPaths, getPropPath([propPath, index])],
                })
              )
        )
      );
    }

    return result;
  }, {}) as P;
}

export const useComposerRender: Types.ComposerRenderHook = (render) => {
  const getHandles = useMutableHandles();
  const { getWidget } = useHandles();

  return function generate(target, queue) {
    const [element, widget] = getWidget(target);
    const key = `${queue.group}_${widget?.id || 'none'}_${queue.index || 0}`;

    return !widget
      ? null
      : render(element, {
          key,
          props:
            widget.category !== 'node'
              ? { children: widget.content || '' }
              : getProps<ComponentProps<typeof element>>(widget, queue, {
                  generate,
                  getHandles,
                }),
        });
  };
};
