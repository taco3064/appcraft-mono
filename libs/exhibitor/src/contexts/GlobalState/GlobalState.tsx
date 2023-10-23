import * as React from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../utils';
import { useHandles, useMutableHandles } from '../Handles';
import type * as Types from './GlobalState.types';

//* Variables
const sources: Appcraft.StateCategory[] = ['props', 'todos', 'nodes'];

//* Methods
const getStateOptions: Types.GetStateOptionsFn = (
  state,
  renderPaths,
  propPath,
  override
) => {
  const source = state.category;
  const options: typeof state = JSON.parse(JSON.stringify(state));

  if (override) {
    if (source === 'nodes') {
      const value = override as Types.InjectType<'nodes'>;

      _set(options, ['template', 'id'], value.id);
    } else if (source === 'props') {
      const value = override as Types.InjectType<'props'>;

      _set(options, ['defaultValue'], value);
    }
  }

  return {
    category: source,
    options,
    value: _get(options, ['defaultValue']),
    stateKey: propPath,
    propPath: propPath.substring(
      propPath.lastIndexOf(`.${source}.`) + `.${source}.`.length
    ),
    renderPath: Util.getPropPath(
      source === 'nodes'
        ? renderPaths
        : [
            ...renderPaths,
            propPath.substring(0, propPath.lastIndexOf(`.${source}.`)),
          ]
    ),
  };
};

//* Custom Hooks
function reducer(
  globalState: Types.GlobalState | undefined,
  { type, payload }: Types.GlobalAction
) {
  if (globalState && type === 'setProps') {
    return Object.entries(payload).reduce((result, [group, values]) => {
      const { [group]: states } = result;

      if (states) {
        Object.entries(values).forEach(([propPath, value]) => {
          const target = states.find(({ stateKey }) => stateKey === propPath);

          target && _set(target, 'value', value);
        });
      }

      return {
        ...result,
        [group]: states,
      };
    }, globalState);
  }

  if (globalState && type === 'setState') {
    const { group, values } = payload;
    const { [group]: states } = globalState;
    const keys = Object.keys(values || {});

    return !states || !keys.length
      ? globalState
      : {
          ...globalState,
          [group]: states.map((state) => {
            const { stateKey } = state;
            const target = keys.find((key) => key === stateKey);

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

              states.push(
                getStateOptions(
                  state,
                  renderPaths,
                  propPath,
                  isOverrideAllowed && override
                )
              );

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
  const { globalState, pendingRef } = React.useContext(GlobalStateContext);

  return React.useCallback(
    (pending) => {
      const stringify = JSON.stringify(pending.renderPaths);

      if (
        !Object.keys(globalState).length && //* 未進行初始化時，使用 pendingRef 進行緩存
        !pendingRef.current?.some(
          ({ group, renderPaths }) =>
            group === pending.group && JSON.stringify(renderPaths) === stringify
        )
      ) {
        pendingRef.current?.push(pending);
      }
    },
    [globalState, pendingRef]
  );
};

export const useGlobalState: Types.GlobalStateHook = () => {
  const { getWidgetOptions } = useHandles();
  const { globalState, dispatch } = React.useContext(GlobalStateContext);

  return {
    onPropsChange: React.useCallback(
      (payload) => dispatch({ type: 'setProps', payload }),
      [dispatch]
    ),
    onStateChange: React.useCallback(
      (group, values) =>
        dispatch({ type: 'setState', payload: { group, values } }),
      [dispatch]
    ),
    getGlobalState: React.useCallback(
      (group, renderPaths, injection) => {
        const { [group]: target } = globalState;
        const path = Util.getPropPath(renderPaths);

        return (target || []).reduce(
          (result, { category, propPath, renderPath, options, value }) => {
            if (renderPath === path) {
              if (category === 'nodes') {
                const id = _get(options, ['template', 'id']);
                const widget = getWidgetOptions('template', id);

                console.log(
                  Util.getWidgetsByValue(
                    widget,
                    _get(injection, ['nodes', options.alias || propPath]),
                    value,
                    options as Appcraft.EntityNodeStates,
                    getWidgetOptions
                  )
                );

                _set(
                  result,
                  [category, propPath],
                  Util.getWidgetsByValue(
                    widget,
                    _get(injection, ['nodes', options.alias || propPath]),
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
  const [globalState, dispatch] = React.useReducer(reducer, undefined);
  const isInitialized = Boolean(globalState);

  const value = React.useMemo(
    () => ({
      globalState: globalState || {},
      pendingRef,
      dispatch,
    }),
    [globalState, dispatch]
  );

  React.useEffect(() => {
    if (!isInitialized) {
      dispatch({
        type: 'initial',
        payload: { pending: pendingRef.current || [], getWidgetOptions },
      });
    }
  }, [isInitialized, getWidgetOptions]);

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
          onPropsChange: (payload) => dispatch({ type: 'setProps', payload }),
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
