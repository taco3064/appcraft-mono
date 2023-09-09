import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _toPath from 'lodash/toPath';
import type { TodosState } from '@appcraft/types';

import * as Common from '../common';
import type * as Types from './CraftsmanOverride.types';

const CraftsmanOverrideContext =
  React.createContext<Types.CraftsmanOverrideContextValue | null>(null);

export const useCraftsmanOverrideContext: Types.CraftsmanOverrideContextHook = (
  options = {}
) => {
  const ref = React.useContext(CraftsmanOverrideContext);

  return ref?.current?.(options) || {};
};

export default function CraftsmanOverrideProvider({
  children,
  disableTodoEventSource = false,
  hierarchyid,
  onTodoView,
  onWidgetView,
}: Types.CraftsmanOverrideProviderProps) {
  const handleFetch = Common.useCraftsmanFetch();

  const overrides = Common.useCraftsmanOverride({
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
      const { state } = await handleFetch.wrapper('widget', templateid);

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
    TEMPLATE_TODO_ITEM: (opts, category, props) => (
      <Common.TemplateTodoItem
        {...(props as Common.TemplateTodoItemProps)}
        CraftedTodoEditorProps={overrides(opts)}
      />
    ),
    TEMPLATE_WIDGET_PICKER: (opts, category, props) => (
      <Common.WidgetPicker
        {...(props as Common.WidgetPickerProps)}
        {...(hierarchyid && { exclude: [hierarchyid] })}
        fullWidth
        size="small"
        variant="outlined"
        onView={onWidgetView}
      />
    ),
    TODO_PROPS_GROUP_PICKER: ({ layouts }, category, props) => (
      <Common.PropsGroupPicker
        {...(props as Common.PropPathPickerProps)}
        layouts={layouts}
        onView={onWidgetView}
      />
    ),
    TODO_WRAPPER_PICKER: (opts, category, props) => (
      <Common.TodoWrapperPicker
        {...(props as Common.TodoWrapperPickerProps)}
        onView={onTodoView}
      />
    ),
    TODO_PROPS_PATH_PICKER: ({ layouts }, category, props) => {
      const group = _get(props, [
        'props',
        ..._toPath(props.propPath.replace(/\.propName$/, '.group')),
      ]);

      return (
        <Common.PropPathPicker
          {...(props as Common.PropPathPickerProps)}
          layout={layouts.find(({ id }) => id === group)}
        />
      );
    },
    TODO_STATE_PATH_PICKER: ({ widget }, category, props) => (
      <Common.StatePathPicker
        {...(props as Omit<Common.StatePathPickerProps, 'states'>)}
        states={_omit(widget?.state || {}, ['todos'])}
      />
    ),
  });

  const value = React.useRef(overrides);

  return (
    <CraftsmanOverrideContext.Provider value={value}>
      {children}
    </CraftsmanOverrideContext.Provider>
  );
}
