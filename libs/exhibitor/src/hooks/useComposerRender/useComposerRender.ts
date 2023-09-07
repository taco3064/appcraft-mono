import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _set from 'lodash/set';
import type { ComponentProps } from 'react';
import type { MainWidget, StateCategory } from '@appcraft/types';

import * as Ctx from '../../contexts';
import { getEventHandler, getPropPath } from '../../utils';
import type * as Types from './useComposerRender.types';

const sources: StateCategory[] = ['props', 'todos', 'nodes'];

function getProps<P>(
  ...[
    widget,
    { group, injection, renderPaths = [] },
    {
      generate,
      getGlobalState,
      onFetchData,
      onFetchWrapper,
      onOutputCollect,
      onPropsChange,
      onStateChange,
    },
  ]: Types.GetPropsArgs
) {
  const states = getGlobalState(group, renderPaths);

  return sources.reduce((result, source) => {
    if (source === 'props') {
      Object.entries({ ...widget[source], ...states[source] }).forEach(
        ([propPath, value]) => _set(result, propPath, value)
      );
    } else if (source === 'todos') {
      const merged = _merge({}, widget[source], states[source]);

      Object.entries(merged).forEach(([propPath, todos]) =>
        _set(
          result,
          propPath,
          getEventHandler(todos, {
            eventName: propPath,
            onFetchData,
            onFetchTodoWrapper: (todoid) => onFetchWrapper('todo', todoid),
            onOutputCollect,
            onPropsChange,
            onStateChange: (e) => onStateChange(group, e),
          })
        )
      );
    } else if (source === 'nodes') {
      Object.entries({ ...widget[source], ...states[source] }).forEach(
        ([propPath, nodes]) =>
          _set(
            result,
            propPath,
            !Array.isArray(nodes)
              ? generate(nodes, {
                  group,
                  injection: _get(injection, ['nodes', propPath]),
                  renderPaths: [
                    ...renderPaths,
                    getPropPath(['nodes', propPath]),
                  ],
                })
              : nodes.map((node, index) =>
                  generate(node, {
                    group,
                    index,
                    injection: _get(injection, ['nodes', propPath]),
                    renderPaths: [
                      ...renderPaths,
                      getPropPath(['nodes', propPath, index]),
                    ],
                  })
                )
          )
      );
    }

    return result;
  }, {}) as P;
}

export const useComposerRender: Types.ComposerRenderHook = (render) => {
  const getHandles = Ctx.useMutableHandles();
  const setInitializePending = Ctx.useInitializePending();
  const { getGlobalState, onPropsChange, onStateChange } = Ctx.useGlobalState();
  const { getWidget } = Ctx.useHandles();

  return function generate(target, queue) {
    const [element, widget] = getWidget(target);
    const mutableHandles = getHandles<'todo'>();
    const key = `${queue.group}_${widget?.id || 'none'}_${queue.index || 0}`;

    if (widget?.category === 'node' && 'state' in widget) {
      setInitializePending({
        group: queue.group,
        injection: queue.injection,
        renderPaths: queue.renderPaths || [],
        widget: widget as MainWidget,
      });
    }

    return !widget || !mutableHandles
      ? null
      : render(element, {
          key,
          props:
            widget.category !== 'node'
              ? { children: widget.content || '' }
              : getProps<ComponentProps<typeof element>>(widget, queue, {
                  ...mutableHandles,
                  generate,
                  getGlobalState,
                  onPropsChange,
                  onStateChange,
                }),
        });
  };
};
