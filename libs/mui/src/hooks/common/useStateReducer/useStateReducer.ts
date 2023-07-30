import _get from 'lodash/get';
import _set from 'lodash/set';
import { useMemo, useReducer } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

import { getForceArray } from '../../../utils';
import type * as Types from './useStateReducer.types';

const useStateReducer: Types.StateReducerHook = (options) => {
  const widgets = useMemo(
    () =>
      new Map<string, RootNodeWidget>(
        getForceArray(
          !Array.isArray(options)
            ? options
            : options.map(({ widget }) => widget)
        ).map((widget) => [widget.id, widget])
      ),
    [options]
  );

  const initial: Types.ReducerState = useMemo(
    () =>
      Array.from(widgets.values()).reduce<Types.ReducerState>(
        (result, { id, state = {} }) => {
          Object.entries(state).forEach(([category, value]) =>
            Object.entries(value).forEach(([path, options]) => {
              _set(result, [id, path], {
                category,
                options,
                value: _get(options, 'defaultValue'),
              });
            })
          );

          return result;
        },
        {}
      ),
    [widgets]
  );

  return useReducer<Types.Reducer>(
    (state, { id, path, value }) => ({ ..._set(state, [id, path], value) }),
    initial
  );
};

export default useStateReducer;

// getProps: (id, defaultProps, superior) => {
//   const implement = _get(state, [id]);

//   Object.entries(implement).forEach(
//     ([propPath, { category, value, options }]) => {
//       const propValue =
//         options.type === 'private'
//           ? value
//           : superior && _get(state, [superior.id, superior.path, 'value']);

//       if (category === 'props') {
//         _set(defaultProps, propPath, propValue);
//       } else if (category === 'todos') {
//         _set(
//           defaultProps,
//           propPath,
//           getEventHandler(value as Record<string, Appcraft.WidgetTodo>, {
//             eventName: propPath,
//             onFetchTodoWrapper,
//             onOutputCollect,
//           })
//         );
//       } else if (renderer instanceof Function && category === 'nodes') {
//         const widgets = getForceArray(value as Appcraft.WidgetOptions);

//         _set(
//           defaultProps,
//           propPath,
//           widgets.map((widget) => renderer(widget))
//         );
//       }
//     }
//   );

//   return defaultProps;
// },
