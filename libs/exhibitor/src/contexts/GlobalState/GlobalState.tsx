import * as React from 'react';
import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _set from 'lodash/set';
import { nanoid } from 'nanoid';
import type * as Appcraft from '@appcraft/types';

import { getPropPath } from '../../utils';
import { useHandles } from '../Handles';
import type * as Types from './GlobalState.types';

//* Variables
const sources: Appcraft.StateCategory[] = ['props', 'todos', 'nodes'];

//* Methods
const getPropsByValue: Types.GetPropsByValueFn = ({ value, state = {} }) => {
  const propPaths = Object.keys(state);

  return Object.entries(value || {}).reduce(
    (result, [propName, propValue]) =>
      _set(
        result,
        propPaths.find((propPath) => {
          const target = _get(state, [propPath, 'alias']) || propPath;

          return propName === target;
        }) || propName,
        propValue
      ),
    {}
  );
};

const getTodosByTemplate: Types.GetTodosByTemplateFn = ({
  template = {},
  todos = {},
  state = {},
}) => {
  const eventPaths = Object.keys(state);

  return Object.entries(template).reduce((result, [eventName, temp]) => {
    const propPath =
      eventPaths.find((eventPath) => {
        const target = _get(state, [eventPath, 'alias']) || eventPath;

        return eventName === target;
      }) || eventName;

    return _set(result, propPath, _merge({}, todos[propPath], temp));
  }, {});
};

const getNodeByValue: Types.GetNodeByValueFn = (
  widget,
  value,
  { nodeType, template }
) => {
  if (!widget) {
    return nodeType === 'element'
      ? { category: 'plainText', id: nanoid(4), content: value as string }
      : !Array.isArray(value)
      ? []
      : value.map((content: string) => ({
          category: 'plainText',
          id: nanoid(4),
          content,
        }));
  }

  const { props, todos, state } = widget;

  if (nodeType === 'element') {
    return {
      ...widget,
      props: {
        ...props,
        ...getPropsByValue({ value, state: state?.props }),
      },
      todos: {
        ...todos,
        ...getTodosByTemplate({
          todos,
          template: template?.todos,
          state: state?.todos,
        }),
      },
    };
  }

  return !Array.isArray(value)
    ? []
    : value.map((val) => ({
        ...widget,
        props: {
          ...props,
          ...getPropsByValue({ value: val, state: state?.props }),
        },
        todos: {
          ...todos,
          ...getTodosByTemplate({
            todos,
            template: template?.todos,
            state: state?.todos,
          }),
        },
      }));
};

//* Custom Hooks
function reducer(
  globalState: Types.GlobalState,
  { type, payload }: Types.GlobalAction
) {
  switch (type) {
    case 'setState': {
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
    case 'initial': {
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
                  renderPath: getPropPath(
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
    default:
      return globalState;
  }
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
        const path = getPropPath(renderPaths);

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
                    getNodeByValue(
                      widget,
                      value,
                      options as Appcraft.EntityNodeStates
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
}: Types.GlobalStateProviderProps) {
  const { getWidgetOptions } = useHandles();
  const pendingRef = React.useRef<Types.PendingStateOptions[]>([]);
  const [globalState, dispatch] = React.useReducer(reducer, {});

  const value = React.useMemo(
    () => ({
      globalState,
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

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}
