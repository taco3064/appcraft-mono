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
const getNodesByValue: Types.GetNodesByValueFn = (
  { defaultNodes = {}, value, states = {} },
  getWidgetOptions
) => {
  const nodePaths = Object.keys(states);

  return Object.entries(value || {}).reduce(
    (result, [propName, propValue]) => {
      const path = nodePaths.find(
        (nodePath) =>
          propName === (_get(states, [nodePath, 'alias']) || nodePath)
      );

      if (path) {
        const { template } = states[path];
        const widget = getWidgetOptions('template', template?.id as string);

        _set(
          result,
          path,
          getNodeByValue(widget, propValue, states[path], getWidgetOptions)
        );
      }

      return result;
    },
    { nodes: JSON.parse(JSON.stringify(defaultNodes)) as typeof defaultNodes }
  ).nodes;
};

const getPropsByValue: Types.GetPropsByValueFn = ({ value, states = {} }) => {
  const propPaths = Object.keys(states);

  return Object.entries(value || {}).reduce((result, [propName, propValue]) => {
    const path = propPaths.find(
      (propPath) => propName === (_get(states, [propPath, 'alias']) || propPath)
    );

    if (path) {
      _set(result, path, propValue);
    }

    return result;
  }, {});
};

const getTodosByTemplate: Types.GetTodosByTemplateFn = ({
  defaultTodos = {},
  template = {},
  states = {},
}) => {
  const eventPaths = Object.keys(states);

  return Object.entries(template).reduce((result, [eventName, events]) => {
    const path = eventPaths.find(
      (eventPath) =>
        eventName === (_get(states, [eventPath, 'alias']) || eventPath)
    );

    if (path) {
      _set(result, path, _merge({}, defaultTodos[path], events));
    }

    return result;
  }, JSON.parse(JSON.stringify(defaultTodos)) as typeof defaultTodos);
};

const getNodeByValue: Types.GetNodeByValueFn = (
  widget,
  value,
  { nodeType, template },
  getWidgetOptions
) => {
  if (!widget) {
    return nodeType === 'element'
      ? { category: 'plainText', id: nanoid(4), content: value as string }
      : (Array.isArray(value) ? value : [value]).map((content: string) => ({
          category: 'plainText',
          id: nanoid(4),
          content,
        }));
  }

  const { props, todos, nodes, state } = widget;

  if (nodeType === 'element') {
    return {
      ...widget,
      nodes: getNodesByValue(
        { defaultNodes: nodes, value, states: state?.nodes },
        getWidgetOptions
      ),
      props: {
        ...props,
        ...getPropsByValue({ value, states: state?.props }),
      },
      todos: getTodosByTemplate({
        defaultTodos: todos,
        template: template?.todos,
        states: state?.todos,
      }),
    };
  }

  return !Array.isArray(value)
    ? []
    : value.map((val) => ({
        ...widget,
        nodes: getNodesByValue(
          { defaultNodes: nodes, value: val, states: state?.nodes },
          getWidgetOptions
        ),
        props: {
          ...props,
          ...getPropsByValue({ value: val, states: state?.props }),
        },
        todos: getTodosByTemplate({
          defaultTodos: todos,
          template: template?.todos,
          states: state?.todos,
        }),
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
