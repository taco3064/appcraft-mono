import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _set from 'lodash/set';
import { startTransition } from 'react';
import type { ComponentProps } from 'react';
import type { MainWidget, StateCategory, WidgetTodo } from '@appcraft/types';

import * as Ctx from '../../contexts';
import * as Util from '../../utils';
import type * as Types from './useComposerRender.types';
import type { OutputData } from '../../utils';

const sources: StateCategory[] = ['props', 'todos', 'nodes'];

function getTodosPriority(todos: Record<string, WidgetTodo>) {
  return Object.entries(todos).reduce((result, [id, todo]) => {
    const { priority = 3 } = todo;
    const acc = result[priority - 1] || {};

    result[priority - 1] = _set(acc, [id], todo);

    return result;
  }, new Array<Record<string, WidgetTodo>>(3));
}

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
  const states = getGlobalState(group, renderPaths, injection);

  return sources.reduce((result, source) => {
    if (source === 'props') {
      Object.entries({ ...widget[source], ...states[source] }).forEach(
        ([propPath, value]) => _set(result, propPath, value)
      );
    } else if (source === 'todos') {
      /**
       * * 這裡的 todos 需要依據其來源進行區分，來源會有以下幾種(編號視同應遵守的執行順序)：
       * * 1. widget 本身 - 此處取自於 widget，區分則是在 widget-parser 中
       * * 2. node state 中的 template - 同上
       * * 3. layout template - 取自 states
       */
      Object.entries(widget[source] || {}).forEach(([propPath, todos]) => {
        const handles = getTodosPriority(todos).map((e) =>
          Util.getEventHandler(e, {
            eventName: propPath,
            onFetchData,
            onFetchTodoWrapper: (todoid) => onFetchWrapper('todo', todoid),
            onPropsChange,
            onStateChange: (e) => onStateChange(group, e),
          })
        );

        _set(result, propPath, (...e: unknown[]) => {
          const start = Date.now();

          startTransition(() => {
            handles
              .reduce(
                (promise, handler) =>
                  promise.then((outputs) =>
                    handler({ [Util.OUTPUTS_SYMBOL]: outputs }, ...e)
                  ),
                Promise.resolve<OutputData[]>([])
              )
              .then((outputs) =>
                onOutputCollect?.(
                  { duration: Date.now() - start, outputs, todos },
                  propPath
                )
              );
          });
        });
      });
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
                    Util.getPropPath(['nodes', propPath]),
                  ],
                })
              : nodes.map((node, index) =>
                  generate(node, {
                    group,
                    index,
                    injection: _get(injection, ['nodes', propPath]),
                    renderPaths: [
                      ...renderPaths,
                      Util.getPropPath(['nodes', propPath, index]),
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
