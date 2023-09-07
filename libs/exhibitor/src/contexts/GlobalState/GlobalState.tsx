import * as React from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../utils';
import { useHandles, useMutableHandles } from '../Handles';
import type * as Types from './GlobalState.types';

//* Variables
const sources: Appcraft.StateCategory[] = ['props', 'todos', 'nodes'];

//* Custom Hooks
function reducer(
  globalState: Types.GlobalState | undefined,
  { type, payload }: Types.GlobalAction
) {
  if (globalState && type === 'setState') {
    const { group, values } = payload;
    const { [group]: states } = globalState;
    const keys = Object.keys(values || {});

    return !states || !keys.length
      ? globalState
      : {
          ...globalState,
          [group]: states.map((state) => {
            const { category, propPath, renderPath } = state;

            const target = keys.find(
              (key) =>
                renderPath ===
                  key.substring(0, key.lastIndexOf(`.${category}.`)) &&
                propPath ===
                  key.substring(
                    key.lastIndexOf(`.${category}.`) + `.${category}.`.length
                  )
            );

            return !target ? state : _set(state, ['value'], values[target]);
          }),
        };
  }

  if (type === 'initial') {
    const { pending, getWidgetOptions } = payload;

    return pending.reduce<Types.GlobalState>(
      (result, { group, injection, renderPaths, widget }) => {
        const target = getWidgetOptions('template', injection?.id as string);
        const isOverrideAllowed = target === widget;

        sources.forEach((source) =>
          Object.entries({ ..._get(widget, ['state', source]) }).forEach(
            ([propPath, state]) => {
              const { [group]: states = [] } = result;
              const key = state.alias || propPath;
              const override = _get(injection, [source, key]);

              const options: Types.StateType<typeof source> = JSON.parse(
                JSON.stringify(state)
              );

              if (isOverrideAllowed && override) {
                if (source === 'nodes') {
                  const value = override as Types.InjectType<'nodes'>;

                  _set(options, ['template', 'id'], value.id);
                } else if (source === 'props') {
                  const value = override as Types.InjectType<'props'>;

                  _set(options, ['defaultValue'], value);
                }
              }

              states.push({
                category: source,
                options,
                propPath: propPath.substring(
                  propPath.lastIndexOf(`.${source}.`) + `.${source}.`.length
                ),
                value:
                  isOverrideAllowed && source === 'todos'
                    ? _get(injection, [source, key])
                    : _get(options, ['defaultValue']),
                renderPath: Util.getPropPath(
                  source === 'nodes'
                    ? renderPaths
                    : [
                        ...renderPaths,
                        propPath.substring(
                          0,
                          propPath.lastIndexOf(`.${source}.`)
                        ),
                      ]
                ),
              });

              _set(result, [group], states);
            }
          )
        );

        return result;
      },
      {}
    );
  }

  return globalState;
}

const GlobalStateContext = React.createContext<Types.GlobalStateContextValue>({
  globalState: {},
  dispatch: () => null,
  pendingRef: React.createRef<Types.PendingStateOptions[]>(),
});

export const useInitializePending: Types.InitializePendingHook = () => {
  const { pendingRef } = React.useContext(GlobalStateContext);

  return React.useCallback(
    (pending) => {
      const stringify = JSON.stringify(pending.renderPaths);

      if (
        !pendingRef.current?.some(
          ({ group, renderPaths }) =>
            group === pending.group && JSON.stringify(renderPaths) === stringify
        )
      ) {
        pendingRef.current?.push(pending);
      }
    },
    [pendingRef]
  );
};

export const useGlobalState: Types.GlobalStateHook = () => {
  const { getWidgetOptions } = useHandles();
  const { globalState, dispatch } = React.useContext(GlobalStateContext);

  return {
    onStateChange: React.useCallback(
      (group, values) =>
        dispatch({ type: 'setState', payload: { group, values } }),
      [dispatch]
    ),
    getGlobalState: React.useCallback(
      (group, renderPaths) => {
        const { [group]: target } = globalState;
        const path = Util.getPropPath(renderPaths);

        return (
          target?.reduce(
            (result, { category, propPath, renderPath, options, value }) => {
              if (renderPath === path) {
                if (category === 'nodes') {
                  const widget = getWidgetOptions(
                    'template',
                    _get(options, ['template', 'id'])
                  );

                  _set(
                    result,
                    [category, propPath],
                    Util.getWidgetsByValue(
                      widget,
                      value,
                      options as Appcraft.EntityNodeStates,
                      getWidgetOptions
                    )
                  );
                } else if (value) {
                  _set(result, [category, propPath], value);
                }
              }

              return result;
            },
            {}
          ) || {}
        );
      },
      [getWidgetOptions, globalState]
    ),
  };
};

//* Provider Component
export default function GlobalStateProvider({
  children,
  onReady,
}: Types.GlobalStateProviderProps) {
  const { getWidgetOptions } = useHandles();
  const getHandles = useMutableHandles();
  const pendingRef = React.useRef<Types.PendingStateOptions[]>([]);
  const [globalState, dispatch] = React.useReducer(reducer, {});
  const isInitialized = Boolean(globalState);

  const value = React.useMemo(
    () => ({
      globalState: globalState || {},
      dispatch,
      pendingRef,
    }),
    [globalState, dispatch]
  );

  React.useEffect(() => {
    dispatch({
      type: 'initial',
      payload: { pending: pendingRef.current || [], getWidgetOptions },
    });
  }, [getWidgetOptions]);

  React.useEffect(() => {
    if (isInitialized && onReady) {
      const handles = getHandles<'todo'>();

      if (onReady instanceof Function) {
        onReady(() => null);
      } else if (onReady && handles) {
        const { onFetchData, onFetchWrapper, onOutputCollect } = handles;

        Util.getEventHandler(onReady, {
          eventName: 'onReady',
          onFetchData,
          onFetchTodoWrapper: (todoid) => onFetchWrapper('todo', todoid),
          onOutputCollect,
        })();
      }
    }
  }, [isInitialized, getHandles, onReady]);

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}
