import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import type { StateCategory } from '@appcraft/types';

import { getInitialState, getStateCategory } from '../../utils';
import type * as Types from './Selection.types';

//* Custom Hooks
const SelectionContext = React.createContext<Types.SelectionContextValue>({
  basePath: '',
  disabled: false,
});

export const useBasePath = () => {
  const { basePath } = React.useContext(SelectionContext);

  return basePath;
};

export const useSelectionAction: Types.SelectionActionHook = () => {
  const { disabled, ref } = React.useContext(SelectionContext);

  return (!disabled && ref?.current?.action) || null;
};

export function useSecondaryAction<M>(category: StateCategory) {
  const { basePath, values, ref } = React.useContext(SelectionContext);
  const renderer: Types.SecondaryActionRenderer<M> | undefined =
    ref?.current?.secondaryActions?.[category];

  return (
    (renderer &&
      ((metadata: M) => renderer({ basePath, widget: values, metadata }))) ||
    undefined
  );
}

export const useSelection: Types.SelectionHook = (
  generator,
  alias,
  propPath,
  options
) => {
  const category = getStateCategory(generator);

  const { basePath, disabled, values, ref } =
    React.useContext(SelectionContext);

  const path = ExhibitorUtil.getPropPath(
    Array.isArray(propPath) ? propPath : [basePath, category, propPath]
  );

  const checked = Boolean(_get(values, ['state', category, path]));

  return [
    disabled ? false : checked,

    !values || disabled ? null : (
      <ListItemIcon onClick={(e) => e.stopPropagation()}>
        <Checkbox
          color="primary"
          checked={checked}
          onChange={(e) => {
            const newChecked = e.target.checked;
            const { onChange } = ref?.current || {};

            const { state: { [category]: state = {}, ...$state } = {} } =
              values;

            if (newChecked) {
              state[path] = getInitialState(generator, alias, options);
            } else {
              delete state[path];
            }

            onChange?.({
              ..._set(values, 'state', {
                ...$state,
                [category]: state,
              }),
            });
          }}
        />
      </ListItemIcon>
    ),
  ];
};

//* Provider Component
export default function SelectionProvider({
  action,
  basePath,
  children,
  disabled = false,
  secondaryActions,
  values,
  onChange,
}: Types.SelectionProviderProps) {
  const ref = React.useRef({ action, secondaryActions, onChange });

  const value = React.useMemo(
    () => ({ basePath, disabled, values, ref }),
    [basePath, disabled, values]
  );

  React.useImperativeHandle(
    ref,
    () => ({ action, secondaryActions, onChange }),
    [action, secondaryActions, onChange]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}
