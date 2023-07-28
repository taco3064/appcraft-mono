import { lazy } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getProps } from '../../utils';
import type * as Types from './useWidgetGenerator.types';

const LazyPlainText = lazy<Types.PlainTextComponent>(async () => ({
  default: ({ children }) => children as JSX.Element,
}));

const useWidgetGenerator: Types.WidgetGeneratorHook = (
  { externalLazy, onFetchTodoWrapper, onOutputCollect },
  renderer
) =>
  function generator(widget, index) {
    const key = index === undefined ? `${widget.id}` : `${widget.id}-${index}`;

    const { type, content } = widget as Appcraft.NodeWidget &
      Appcraft.PlainTextWidget;

    return !type
      ? renderer(LazyPlainText, {
          key,
          props: { children: content || '' } as Types.PlainTextProps,
        })
      : renderer(externalLazy(type), {
          key,
          props: getProps(widget as Appcraft.NodeWidget, {
            onFetchTodoWrapper,
            onOutputCollect,
            renderer: generator,
          }),
        });
  };

export default useWidgetGenerator;
