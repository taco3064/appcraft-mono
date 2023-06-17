import _set from 'lodash/set';
import type * as Appcraft from '@appcraft/types';

import type { Renderer } from './useWidgetProps.types';

export const getProps = <P extends object>(
  options: Appcraft.NodeWidget | Appcraft.ConfigOptions,
  renderer?: Renderer
) => {
  const fields: Appcraft.WidgetField[] = ['nodes', 'props', 'todos'];

  return fields.reduce((result, widgetField) => {
    const { [widgetField as keyof typeof options]: props = {} } = options;

    Object.entries(props).forEach(([propPath, value]) => {
      if (renderer instanceof Function && widgetField === 'nodes') {
        _set(
          result,
          propPath,
          Array.isArray(value)
            ? value.map(renderer)
            : renderer(value as Appcraft.WidgetOptions)
        );
      } else if (widgetField === 'props') {
        _set(result, propPath, value);
      }
    });

    return result;
  }, {}) as P;
};
