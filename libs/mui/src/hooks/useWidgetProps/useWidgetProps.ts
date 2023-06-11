import _set from 'lodash.set';
import { ComponentProps, ExoticComponent, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

const useWidgetProps = <T extends ExoticComponent>(
  options: Appcraft.WidgetOptions,
  render: (child: Appcraft.WidgetOptions) => JSX.Element
): ComponentProps<T> => {
  const ref = useRef<typeof render>(render);

  return useMemo(() => {
    const fields: Appcraft.WidgetField[] = ['events', 'nodes', 'props'];
    const { type } = options as Appcraft.NodeWidget;

    return (
      !type
        ? {
            children: (options as Appcraft.PlainTextWidget).content || '',
          }
        : fields.reduce((result, widgetField) => {
            const { [widgetField]: props = {} } =
              options as Appcraft.NodeWidget;

            Object.entries(props).forEach(([propPath, value]) => {
              if (widgetField === 'nodes') {
                _set(
                  result,
                  propPath,
                  Array.isArray(value)
                    ? value.map(ref.current)
                    : ref.current(value as Appcraft.WidgetOptions)
                );
              } else if (widgetField === 'props') {
                _set(result, propPath, value);
              }
            });

            return result;
          }, {})
    ) as ComponentProps<T>;
  }, [options, ref]);
};

export default useWidgetProps;
