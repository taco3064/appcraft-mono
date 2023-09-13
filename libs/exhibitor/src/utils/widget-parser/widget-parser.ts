import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _set from 'lodash/set';
import { nanoid } from 'nanoid';
import type { StateCategory } from '@appcraft/types';

import type * as Types from './widget-parser.types';

const setTodoPriority: Types.SetTodoPriorityFn = (allTodos, priority) =>
  Object.fromEntries(
    Object.entries(allTodos).map(([propPath, todos]) => [
      propPath,
      Object.fromEntries(
        Object.entries(todos || {}).map(([id, todo]) => [
          id,
          { priority, ...todo },
        ])
      ),
    ])
  ) as ReturnType<Types.SetTodoPriorityFn>;

const convertInjectionWithStates: Types.ConvertInjectionWithStates = ({
  injection,
  states,
}) => {
  const sources: Exclude<StateCategory, 'nodes'>[] = ['props', 'todos'];

  return sources.reduce<ReturnType<Types.ConvertInjectionWithStates>>(
    (result, key) => {
      const { [key]: target = {} } = result;
      const { [key]: state } = states || {};
      const { [key]: source } = injection || {};

      Object.entries(source || {}).forEach(([propName, value]) => {
        const [propPath] =
          Object.entries(state || {}).find(
            ([path, { alias }]) => propName === (alias || path)
          ) || [];

        if (propPath) {
          _set(target, [propPath.replace(new RegExp(`^${key}\\.`), '')], value);
        }
      });

      return { ...result, [key]: target };
    },
    {}
  );
};

export const getWidgetNodes: Types.GetWidgetNodesFn = (
  { defaultNodes = {}, injection, value, states = {} },
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
          getWidgetsByValue(
            widget,
            _get(injection, path),
            propValue,
            states[path],
            getWidgetOptions
          )
        );
      }

      return result;
    },
    { nodes: JSON.parse(JSON.stringify(defaultNodes)) as typeof defaultNodes }
  ).nodes;
};

export const getWidgetProps: Types.GetWidgetPropsFn = ({
  value,
  states = {},
}) => {
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

export const getWidgetTodos: Types.GetWidgetTodosFn = ({
  defaults = {},
  injection = {},
  template = {},
  states = {},
}) => {
  const eventPaths = Object.keys(states);

  return _merge(
    {},
    setTodoPriority(JSON.parse(JSON.stringify(defaults)), 1),
    setTodoPriority(injection, 3),
    setTodoPriority(
      Object.entries(template).reduce((result, [eventName, todos]) => {
        const path = eventPaths
          .find(
            (eventPath) =>
              eventName ===
              (_get(states, [eventPath, 'alias']) ||
                eventPath.replace(/^todos\./, ''))
          )
          ?.replace(/^todos\./, '');

        return !path ? result : _set(result, [path], todos);
      }, {}),
      2
    )
  );
};

export const getWidgetsByValue: Types.GetWidgetsByValueFn = (
  widget,
  injection,
  value,
  { nodeType, template },
  getWidgetOptions
) => {
  if (!widget) {
    return nodeType === 'element'
      ? { category: 'plainText', id: nanoid(4), content: value as string }
      : (Array.isArray(value) ? value : [value]).map((content) => ({
          category: 'plainText',
          id: nanoid(4),
          content:
            typeof content === 'string' ? content : JSON.stringify(content),
        }));
  }

  const { props, todos, nodes, state } = widget;
  const external = convertInjectionWithStates({ injection, states: state });

  if (nodeType === 'element') {
    return {
      ...widget,
      nodes: getWidgetNodes(
        { defaultNodes: nodes, injection, value, states: state?.nodes },
        getWidgetOptions
      ),
      props: {
        ...props,
        ...external.props,
        ...getWidgetProps({ value, states: state?.props }),
      },
      todos: getWidgetTodos({
        defaults: todos,
        injection: external.todos,
        template: template?.todos,
        states: state?.todos,
      }),
    };
  }

  return !Array.isArray(value)
    ? []
    : value.map((val) => ({
        ...widget,
        nodes: getWidgetNodes(
          { defaultNodes: nodes, injection, value: val, states: state?.nodes },
          getWidgetOptions
        ),
        props: {
          ...props,
          ...external.props,
          ...getWidgetProps({ value: val, states: state?.props }),
        },
        todos: getWidgetTodos({
          defaults: todos,
          injection: external.todos,
          template: template?.todos,
          states: state?.todos,
        }),
      }));
};
