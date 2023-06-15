import { ComponentProps, ExoticComponent } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getProps } from './useWidgetProps.utils';
import type { Renderer } from './useWidgetProps.types';

const useWidgetProps = <T extends ExoticComponent>(
  options: Appcraft.WidgetOptions,
  render: Renderer
): ComponentProps<T> => {
  const { type, content } = options as Appcraft.NodeWidget &
    Appcraft.PlainTextWidget;

  return !type
    ? ({
        children: content || '',
      } as ComponentProps<T>)
    : getProps<ComponentProps<T>>(options as Appcraft.NodeWidget, render);
};

export default useWidgetProps;
