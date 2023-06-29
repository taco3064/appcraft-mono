import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ComponentProps, createContext, useContext, useMemo } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import type * as Types from './Editor.types';

const EditorContext = (<V extends Types.OptionValues>() =>
  createContext<Types.EditorContextValue<V>>({
    collectionPath: '',
    onChange: () => null,
  }))();

export const useEditorContext = <V extends Types.OptionValues>() =>
  useContext(EditorContext) as Required<Types.EditorContextValue<V>>;

export function EditorProvider<V extends Types.OptionValues>({
  children,
  collectionPath,
  fixedT,
  values,
  onChange,
}: Types.EditorProviderProps<V>) {
  const value = useMemo<Types.EditorContextValue<V>>(
    () => ({
      fixedT,
      collectionPath,
      values,
      onChange,
    }),
    [fixedT, collectionPath, values, onChange]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <EditorContext.Provider
        value={value as ComponentProps<typeof EditorContext.Provider>['value']}
      >
        {children}
      </EditorContext.Provider>
    </LocalizationProvider>
  );
}
