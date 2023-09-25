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
  basePaths: [],
  disabled: false,
});

export const useBasePaths = () => {
  const { basePaths } = React.useContext(SelectionContext);

  return basePaths;
};

export const useSelectionAction: Types.SelectionActionHook = () => {
  const { disabled, ref } = React.useContext(SelectionContext);

  return (!disabled && ref?.current?.action) || null;
};

export function useSecondaryAction<M>(category: StateCategory) {
  const { basePaths, values, ref } = React.useContext(SelectionContext);
  const renderer: Types.SecondaryActionRenderer | undefined =
    ref?.current?.secondaryActions?.[category];

  return (
    (renderer &&
      ((path: string) => renderer({ basePaths, widget: values, path }))) ||
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

  const { basePaths, disabled, values, ref } =
    React.useContext(SelectionContext);

  const path = ExhibitorUtil.getPropPath(
    Array.isArray(propPath) ? propPath : [...basePaths, category, propPath]
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
  basePaths,
  children,
  disabled = false,
  secondaryActions,
  values,
  onChange,
}: Types.SelectionProviderProps) {
  const ref = React.useRef({
    action,
    secondaryActions,
    onChange,
  });

  const value = React.useMemo(
    () => ({ basePaths, disabled, values, ref }),
    [basePaths, disabled, values]
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
