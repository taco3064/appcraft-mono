import _set from 'lodash.set';
import { ComponentProps, ExoticComponent, useMemo } from 'react';
import type * as Appcraft from '@appcraft/types';

const useWidgetProps = <T extends ExoticComponent>(
  options: Appcraft.WidgetOptions
): ComponentProps<T> =>
  useMemo(() => {
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
              if (widgetField === 'props') {
                _set(result, propPath, value);
              }
            });

            return result;
          }, {})
    ) as ComponentProps<T>;
  }, [options]);

export default useWidgetProps;
