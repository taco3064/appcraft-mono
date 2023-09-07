import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _set from 'lodash/set';
import { nanoid } from 'nanoid';

import type * as Types from './widget-parser.types';

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
          getWidgetsByValue(widget, propValue, states[path], getWidgetOptions)
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

export const getWidgetsByValue: Types.GetWidgetsByValueFn = (
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
