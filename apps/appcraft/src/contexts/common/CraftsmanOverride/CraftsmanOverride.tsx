import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _toPath from 'lodash/toPath';
import type { TodosState } from '@appcraft/types';

import * as Comp from '~appcraft/components/common';
import * as Ctr from '~appcraft/containers/common';
import * as Hook from '~appcraft/hooks/common';
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
  hierarchyid,
  onTodoView,
  onWidgetView,
}: Types.CraftsmanOverrideProviderProps) {
  const handleFetch = Hook.useCraftsmanFetch();

  const overrides = Hook.useCraftsmanOverride({
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
      <Ctr.TemplateTodoItem
        {...(props as Ctr.TemplateTodoItemProps)}
        CraftedTodoEditorProps={overrides(opts)}
      />
    ),
    TEMPLATE_WIDGET_PICKER: (opts, category, props) => (
      <Ctr.WidgetPicker
        {...(props as Ctr.WidgetPickerProps)}
        {...(hierarchyid && { exclude: [hierarchyid] })}
        fullWidth
        size="small"
        variant="outlined"
        onView={onWidgetView}
      />
    ),
    TODO_PROPS_GROUP_PICKER: ({ layouts }, category, props) => (
      <Ctr.PropsGroupPicker
        {...(props as Omit<Ctr.PropsGroupPickerProps, 'layouts'>)}
        layouts={layouts}
        onView={onWidgetView}
      />
    ),
    TODO_WRAPPER_PICKER: (opts, category, props) => (
      <Ctr.TodoWrapperPicker
        {...(props as Ctr.TodoWrapperPickerProps)}
        onView={onTodoView}
      />
    ),
    TODO_PROPS_PATH_PICKER: ({ layouts }, category, props) => {
      const group = _get(props, [
        'props',
        ..._toPath(props.propPath.replace(/\.propName$/, '.group')),
      ]);

      return (
        <Ctr.PropPathPicker
          {...(props as Ctr.PropPathPickerProps)}
          layout={layouts.find(({ id }) => id === group)}
        />
      );
    },
    TODO_STATE_PATH_PICKER: ({ widget }, category, props) => (
      <Comp.StatePathPicker
        {...(props as Omit<Comp.StatePathPickerProps, 'states'>)}
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
