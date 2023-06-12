import { ComponentProps, ExoticComponent, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getProps } from './useWidgetProps.utils';
import type { Renderer } from './useWidgetProps.types';

const useWidgetProps = <T extends ExoticComponent>(
  options: Appcraft.WidgetOptions,
  render: Renderer
): ComponentProps<T> => {
  const ref = useRef<Renderer>(render);

  return useMemo(() => {
    const { type } = options as Appcraft.NodeWidget;

    return !type
      ? ({
          children: (options as Appcraft.PlainTextWidget).content || '',
        } as ComponentProps<T>)
      : getProps<ComponentProps<T>>(
          options as Appcraft.NodeWidget,
          ref.current
        );
  }, [options, ref]);
};

export default useWidgetProps;
