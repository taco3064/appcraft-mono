import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import type { TodosState, WidgetState } from '@appcraft/types';

import * as Common from '../common';
import type * as Types from './CraftsmanOverride.types';

const CraftsmanOverrideContext =
  React.createContext<Types.CraftsmanOverrideContextValue | null>(null);

export const useCraftsmanOverrideContext: Types.CraftsmanOverrideContextHook = (
  widget
) => {
  const ref = React.useContext(CraftsmanOverrideContext);

  return ref?.current?.(widget) || {};
};

export default function CraftsmanOverrideProvider({
  children,
  hierarchyid,
  onTodoView,
  onWidgetView,
}: Types.CraftsmanOverrideProviderProps) {
  const [at, ct] = Common.useFixedT('app', 'appcraft');
  const handleFetch = Common.useCraftsmanFetch();

  const overrides = Common.useCraftsmanOverride({
    //* Mixeds
    STATE_DEFAULT_PROP_VALUE: (widget, { values, options }) => ({
      ...options,
      options: [
        {
          ...((values as { options: unknown }).options as typeof options),
          text: 'override',
        },
      ],
    }),

    //* Namings
    TEMPLATE_TODO_NAMING: async (widget, { values, propPath }) => {
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
    TEMPLATE_TODO_ITEM: (widget, category, props) => (
      <Common.TemplateTodoItem
        {...(props as Common.TemplateTodoItemProps)}
        CraftedTodoEditorProps={overrides(widget)}
      />
    ),
    TEMPLATE_WIDGET_PICKER: (widget, category, props) => (
      <Common.WidgetPicker
        {...(props as Common.WidgetPickerProps)}
        fullWidth
        size="small"
        variant="outlined"
        exclude={[hierarchyid]}
        onView={onWidgetView}
      />
    ),
    TODO_WRAPPER_PICKER: (widget, category, props) => (
      <Common.TodoWrapperPicker
        {...(props as Common.TodoWrapperPickerProps)}
        onView={onTodoView}
      />
    ),
    TODO_STATE_PATH_PICKER: (widget, category, props) => {
      const options: [string, WidgetState][] = Object.entries(
        Object.assign(
          {},
          ...Object.values(_omit(widget?.state || {}, ['todos']))
        )
      );

      return (
        <Common.StatePathPicker
          {...(props as Omit<Common.StatePathPickerProps, 'options'>)}
          options={options.map(([path, { category, alias, description }]) => ({
            value: path,
            primary: alias,
            secondary: `${description || at('msg-no-description')} (${ct(
              `ttl-state-${category}`
            )})`,
          }))}
        />
      );
    },
  });

  const value = React.useRef(overrides);

  return (
    <CraftsmanOverrideContext.Provider value={value}>
      {children}
    </CraftsmanOverrideContext.Provider>
  );
}
