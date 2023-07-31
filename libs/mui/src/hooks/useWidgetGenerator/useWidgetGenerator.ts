import _set from 'lodash/set';
import { lazy } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../utils';
import { useGlobalState } from '../common';
import type * as Types from './useWidgetGenerator.types';

const CATEGORIES: Appcraft.StateCategory[] = ['props', 'nodes', 'todos'];

const LazyPlainText = lazy<Types.PlainTextComponent>(async () => ({
  default: ({ children }) => children as JSX.Element,
}));

const useWidgetGenerator: Types.WidgetGeneratorHook = (
  options,
  { lazy: externalLazy, renderer, onFetchTodoWrapper, onOutputCollect }
) => {
  const handleState = useGlobalState(options);

  return function generator(widget, { templates, superiors = [], index }) {
    const key = index === undefined ? `${widget.id}` : `${widget.id}-${index}`;

    switch (widget.category) {
      case 'node': {
        const Widget = externalLazy(widget.type);

        return renderer(Widget, {
          key,
          props: CATEGORIES.reduce((acc, category) => {
            switch (category) {
              case 'props':
                return Util.getProps(
                  handleState.getProps(widget, superiors),
                  acc
                );

              case 'todos': {
                const props = handleState.getTodos(widget, superiors, {
                  onFetchTodoWrapper,
                  onOutputCollect,
                });

                return Object.entries(props).reduce(
                  (result, [propPath, handleFn]) =>
                    _set(result, propPath, handleFn),
                  acc
                );
              }
              case 'nodes': {
                Object.entries(widget.nodes || {}).forEach(([path, nodes]) => {
                  const children = Util.getForceArray(nodes).map((child) =>
                    generator(child, {
                      templates,
                      superiors: [{ id: child.id, path }, ...superiors],
                    })
                  );

                  _set(acc, path, children);
                });

                return acc;
              }
              default:
                return acc;
            }
          }, {}),
        });
      }
      default:
        return renderer(LazyPlainText, {
          key,
          props: { children: widget.content || '' } as Types.PlainTextProps,
        });
    }
  };
};

export default useWidgetGenerator;
