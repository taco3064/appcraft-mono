import * as React from 'react';
import type * as Types from './Selection.types';

const SelectionContext = React.createContext<Types.SelectionContextValue>({
  basePath: '',
  disabled: false,
});

export const useSelectionContext = () => {
  const { disabled, handleChangeRef, actionRef, ...value } = React.useContext(
    SelectionContext
  ) as Required<Types.SelectionContextValue>;

  return {
    ...value,
    disabled,
    action: (!disabled && actionRef?.current) || null,
    onChange: (!disabled && handleChangeRef?.current) || (() => null),
  };
};

export default function SelectionProvider({
  basePath,
  children,
  disabled = false,
  action,
  values,
  onChange,
}: Types.SelectionProviderProps) {
  const handleChangeRef = React.useRef(onChange);
  const actionRef = React.useRef(action);

  const value = React.useMemo(
    () => ({ basePath, disabled, values, handleChangeRef, actionRef }),
    [basePath, disabled, values]
  );

  React.useImperativeHandle(handleChangeRef, () => onChange, [onChange]);
  React.useImperativeHandle(actionRef, () => action, [action]);

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}
