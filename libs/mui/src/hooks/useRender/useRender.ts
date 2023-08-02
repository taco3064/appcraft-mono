import _get from 'lodash/get';
import _set from 'lodash/set';
import { lazy } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../utils';
import type * as Types from './useRender.types';

const LazyPlainText = lazy<Types.PlainTextComponent>(async () => ({
  default: ({ children }) => children as JSX.Element,
}));

const TYPES: Appcraft.StateCategory[] = ['props', 'todos', 'nodes'];

const getGeneratorOptions: Types.GetGeneratorOptions = (
  widget,
  propPath,
  { state, superiors = [] },
  index
) => {
  const path = Util.getPropPath([state.path || '', 'nodes', propPath]);

  if (_get(widget, 'template')) {
    const { id } = state;
    const templateIndex = _get(widget, 'template.index');

    return typeof templateIndex !== 'number'
      ? {
          state: { id: widget.id },
          superiors: [{ id, path }, ...superiors],
        }
      : {
          state: { id: widget.id },
          superiors: [
            { id, path: Util.getPropPath([path, templateIndex]) },
            ...superiors,
          ],
        };
  }

  return typeof index !== 'number'
    ? { superiors, state: { ...state, path } }
    : { superiors, state: { ...state, path: Util.getPropPath([path, index]) } };
};

const useRender: Types.RenderHook = (
  { onFetchData, onFetchTodoWrapper, onLazyRetrieve, onOutputCollect },
  globalState,
  render
) =>
  function generate(widget, queue) {
    if (widget.category === 'node') {
      const Widget = onLazyRetrieve(widget.type);

      return render(Widget, {
        key: widget.id,
        props: TYPES.reduce((props, type) => {
          if (type === 'props') {
            return Util.getProps(globalState.props(widget, queue), props);
          } else if (type === 'todos') {
            Object.entries(
              globalState.todos(widget, queue, {
                onFetchData,
                onFetchTodoWrapper: (id) => onFetchTodoWrapper('todo', id),
              })
            ).forEach(([propPath, { todos, handlers }]) =>
              _set(props, propPath, async (...e: unknown[]) => {
                const start = Date.now();
                const outputs: Util.OutputData[] = [];

                for (const handler of handlers) {
                  const args = [{ [Util.OUTPUTS_SYMBOL]: outputs }, ...e];

                  outputs.push(...(await handler(...args)));
                }

                onOutputCollect?.(
                  {
                    duration: Date.now() - start,
                    outputs,
                    todos,
                  },
                  propPath
                );
              })
            );
          } else if (type === 'nodes') {
            Object.entries(globalState.nodes(widget, queue)).forEach(
              ([propPath, nodes]) =>
                _set(
                  props,
                  propPath,
                  !Array.isArray(nodes)
                    ? generate(
                        nodes,
                        getGeneratorOptions(nodes, propPath, queue)
                      )
                    : nodes.map((node, i) =>
                        generate(
                          node,
                          getGeneratorOptions(node, propPath, queue, i)
                        )
                      )
                )
            );
          }

          return props;
        }, {}),
      });
    }

    return render(LazyPlainText, {
      key: widget.id,
      props: { children: widget.content || '' },
    });
  };

export default useRender;
