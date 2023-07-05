import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import type * as Types from './Editor.types';

const EditorContext = (<V extends Types.OptionValues>() =>
  React.createContext<Types.EditorContextValue<V>>({
    collectionPath: '',
  }))();

export const useEditorContext = <V extends Types.OptionValues>() => {
  const { handleChangeRef, ...value } = React.useContext(
    EditorContext
  ) as Required<Types.EditorContextValue<V>>;

  return {
    ...value,
    onChange: handleChangeRef?.current || (() => null),
  };
};

export function EditorProvider<V extends Types.OptionValues>({
  children,
  collectionPath,
  fixedT,
  values,
  onChange,
}: Types.EditorProviderProps<V>) {
  const handleChangeRef = React.useRef(onChange);

  const value = React.useMemo<Types.EditorContextValue<V>>(
    () => ({
      fixedT,
      collectionPath,
      values,
      handleChangeRef,
    }),
    [fixedT, collectionPath, values]
  );

  React.useImperativeHandle(handleChangeRef, () => onChange, [onChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <EditorContext.Provider
        value={
          value as React.ComponentProps<typeof EditorContext.Provider>['value']
        }
      >
        {children}
      </EditorContext.Provider>
    </LocalizationProvider>
  );
}
