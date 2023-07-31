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
  templates,
  { lazy: externalLazy, renderer, ...todoOptions }
) => {
  const handleState = useGlobalState(options, templates);

  return function generator(
    widget,
    { superiors = [], index, defaultProps = {} } = {}
  ) {
    const key = index === undefined ? `${widget.id}` : `${widget.id}-${index}`;

    switch (widget.category) {
      case 'node': {
        const Widget = externalLazy(widget.type);

        return renderer(Widget, {
          key,
          props: CATEGORIES.reduce((acc, category) => {
            switch (category) {
              case 'props':
                return Util.getProps(handleState.getProps(widget), acc);

              case 'todos': {
                const props = handleState.getTodos(
                  widget,
                  superiors,
                  todoOptions
                );

                return Object.entries(props).reduce(
                  (result, [propPath, handleFn]) =>
                    _set(result, propPath, handleFn),
                  acc
                );
              }
              case 'nodes': {
                const props = handleState.getNodes(widget, superiors, index);

                return Object.entries(props).reduce(
                  (result, [propPath, children]) => {
                    if (!Array.isArray(children)) {
                      const { widget, defaultProps } = children;

                      _set(
                        result,
                        propPath,
                        generator(widget, {
                          defaultProps,
                          superiors: [
                            { id: widget.id, path: propPath },
                            ...superiors,
                          ],
                        })
                      );
                    } else {
                      _set(
                        result,
                        propPath,
                        children.map(({ widget, defaultProps }, i) =>
                          generator(widget, {
                            defaultProps,
                            index: i,
                            superiors: [
                              { id: widget.id, path: propPath },
                              ...superiors,
                            ],
                          })
                        )
                      );
                    }

                    return result;
                  },
                  acc
                );
              }
              default:
                return acc;
            }
          }, defaultProps),
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
