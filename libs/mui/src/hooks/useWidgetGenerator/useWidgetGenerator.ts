import { lazy } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getProps } from '../../utils';
import type * as Types from './useWidgetGenerator.types';

const LazyPlainText = lazy<Types.PlainTextComponent>(async () => ({
  default: ({ children }) => children as JSX.Element,
}));

const useWidgetGenerator: Types.WidgetGeneratorHook = (
  externalLazy,
  renderer
) =>
  function generator(options, index) {
    const { type, content } = options as Appcraft.NodeWidget &
      Appcraft.PlainTextWidget;

    return !type
      ? renderer(
          LazyPlainText,
          {
            children: content || '',
          } as Types.PlainTextProps,
          index
        )
      : renderer(
          externalLazy(type),
          getProps(options as Appcraft.NodeWidget, generator),
          index
        );
  };

export default useWidgetGenerator;
