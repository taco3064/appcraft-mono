import * as React from 'react';
import _get from 'lodash/get';

import type * as Types from './CraftsmanOverride.types';

//* Variables
const met: Types.MetType = {
  mixed: ({ typeName, propPath }) => {
    if (typeName === 'PropsState' && /^defaultValue$/.test(propPath)) {
      return 'STATE_DEFAULT_PROP_VALUE';
    }
  },

  naming: ({ typeName, propPath }) => {
    if (typeName === 'NodeState' && /^template\.todos$/.test(propPath)) {
      return 'TEMPLATE_TODO_NAMING';
    }
  },

  render: (kind, { typeName, propPath }) => {
    if (
      /^(ElementState|NodeState)$/.test(typeName) &&
      kind === 'pure' &&
      propPath === 'template.id'
    ) {
      return 'TEMPLATE_WIDGET_PICKER';
    }

    if (
      typeName === 'NodeState' &&
      kind === 'display' &&
      /^template\.todos\..*$/.test(propPath)
    ) {
      return 'TEMPLATE_TODO_ITEM';
    }

    if (kind === 'pure' && typeName === 'WrapTodo' && propPath === 'todosId') {
      return 'TODO_WRAPPER_PICKER';
    }

    if (
      kind === 'pure' &&
      typeName === 'SetPropsTodo' &&
      /^props\[\d+\]\.propName$/.test(propPath)
    ) {
      return 'TODO_PROPS_PATH_PICKER';
    }

    if (
      kind === 'pure' &&
      typeName === 'SetStateTodo' &&
      /^states\[\d+\]\.state$/.test(propPath)
    ) {
      return 'TODO_STATE_PATH_PICKER';
    }

    if (
      kind === 'pure' &&
      typeName === 'SetPropsTodo' &&
      /^props\[\d+\]\.group$/.test(propPath)
    ) {
      return 'TODO_PROPS_GROUP_PICKER';
    }
  },
};

//* Methods
const getOverrides: Types.GetOverridesFn = (override) => (opts) => ({
  overrideMixedOptions: (options) =>
    _get(override, met.mixed(options) as string)?.(opts, options),

  overrideNamingProps: (options) =>
    _get(override, met.naming(options) as string)?.(opts, options),

  renderOverrideItem: (...args) =>
    _get(override, met.render(...args) as string)?.(opts, ...args),
});

//* Custom Hooks
const CraftsmanOverrideContext =
  React.createContext<Types.CraftsmanOverrideContextValue>({
    ref: React.createRef<ReturnType<Types.GetOverridesFn>>(),
  });

export const useCraftsmanOverride: Types.CraftsmanOverrideContextHook = (
  options = {}
) => {
  const { hierarchyid, ref } = React.useContext(CraftsmanOverrideContext);
  const { current: overrides } = ref;

  return overrides?.({ ...options, hierarchyid, overrides }) || {};
};

//* Provider Component
export default function CraftsmanOverrideProvider({
  children,
  hierarchyid,
  options,
}: Types.CraftsmanOverrideProviderProps) {
  const ref = React.useRef(getOverrides(options));

  const value = React.useMemo(
    () => ({
      hierarchyid,
      ref,
    }),
    [hierarchyid]
  );

  return (
    <CraftsmanOverrideContext.Provider value={value}>
      {children}
    </CraftsmanOverrideContext.Provider>
  );
}
