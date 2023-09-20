import MenuItem from '@mui/material/MenuItem';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _toPath from 'lodash/toPath';
import type { ComponentProps } from 'react';
import type { TodosState } from '@appcraft/types';

import PropPathPicker from './PropPathPicker';
import PropsGroupPicker from './PropsGroupPicker';
import TemplateTodoItem from './TemplateTodoItem';
import TodoWrapperPicker from './TodoWrapperPicker';
import WidgetPicker from './WidgetPicker';
import { StatePathPicker } from '~appcraft/components';
import type { GetOverrideRenderFn } from './index.types';

export const getOverrideRender: GetOverrideRenderFn = ({
  onFetchWrapper,
  onTodoView,
  onWidgetView,
}) => ({
  //* Mixeds
  STATE_DEFAULT_PROP_VALUE: (opts, { values, options }) => ({
    ...options,
    options: [
      {
        ...((values as { options: unknown }).options as typeof options),
        text: 'override',
      },
    ],
  }),

  //* Namings
  TEMPLATE_TODO_NAMING: async (opts, { values, propPath }) => {
    const templateid: string = _get(values, 'template.id');
    const { state } = await onFetchWrapper('widget', templateid);

    const options: [string, TodosState][] = Object.entries(
      _get(state, ['todos']) || {}
    );

    return {
      select: true,
      disabled: !options.length,
      children: options.map(([path, { alias }]) => (
        <MenuItem key={alias || path} value={alias || path}>
          {alias || path}
        </MenuItem>
      )),
    };
  },

  //* Renders
  TEMPLATE_TODO_ITEM: (opts, category, props) => {
    const { overrides } = opts;

    return (
      <TemplateTodoItem
        {...(props as ComponentProps<typeof TemplateTodoItem>)}
        CraftedTodoEditorProps={overrides(opts)}
      />
    );
  },
  TEMPLATE_WIDGET_PICKER: ({ hierarchyid }, category, props) => (
    <WidgetPicker
      {...(props as ComponentProps<typeof WidgetPicker>)}
      {...(hierarchyid && { exclude: [hierarchyid] })}
      fullWidth
      size="small"
      variant="outlined"
      onView={onWidgetView}
    />
  ),
  TODO_PROPS_GROUP_PICKER: ({ layouts }, category, props) => (
    <PropsGroupPicker
      {...(props as Omit<ComponentProps<typeof PropsGroupPicker>, 'layouts'>)}
      layouts={layouts}
      onView={onWidgetView}
    />
  ),
  TODO_WRAPPER_PICKER: (opts, category, props) => (
    <TodoWrapperPicker
      {...(props as ComponentProps<typeof TodoWrapperPicker>)}
      onView={onTodoView}
    />
  ),
  TODO_PROPS_PATH_PICKER: ({ layouts }, category, props) => {
    const group = _get(props, [
      'props',
      ..._toPath(props.propPath.replace(/\.propName$/, '.group')),
    ]);

    return (
      <PropPathPicker
        {...(props as ComponentProps<typeof PropPathPicker>)}
        layout={layouts.find(({ id }) => id === group)}
      />
    );
  },
  TODO_STATE_PATH_PICKER: ({ widget }, category, props) => (
    <StatePathPicker
      {...(props as Omit<ComponentProps<typeof StatePathPicker>, 'states'>)}
      states={_omit(widget?.state || {}, ['todos'])}
    />
  ),
});
