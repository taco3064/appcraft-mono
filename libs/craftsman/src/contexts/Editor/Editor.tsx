import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import type * as Types from './Editor.types';

const EditorContext = (<V extends Types.OptionValues>() =>
  React.createContext<Types.EditorContextValue<V>>({
    collectionPath: '',
  }))();

export const useEditorContext = <V extends Types.OptionValues>() => {
  const {
    handleChangeRef,
    overrideMixedOptionsRef,
    overrideNamingPropsRef,
    renderOverrideItemRef,
    ...value
  } = React.useContext(EditorContext) as Required<Types.EditorContextValue<V>>;

  return {
    ...value,
    onChange: handleChangeRef?.current || (() => null),
    overrideMixedOptions: overrideMixedOptionsRef?.current,
    overrideNamingProps: overrideNamingPropsRef?.current,
    renderOverrideItem: renderOverrideItemRef?.current,
  };
};

export default function EditorProvider<V extends Types.OptionValues>({
  children,
  collectionPath,
  values,
  overrideMixedOptions,
  overrideNamingProps,
  renderOverrideItem,
  onChange,
}: Types.EditorProviderProps<V>) {
  const handleChangeRef = React.useRef(onChange);
  const overrideMixedOptionsRef = React.useRef(overrideMixedOptions);
  const overrideNamingPropsRef = React.useRef(overrideNamingProps);
  const renderOverrideItemRef = React.useRef(renderOverrideItem);

  const value = React.useMemo<Types.EditorContextValue<V>>(
    () => ({
      collectionPath,
      values,
      handleChangeRef,
      overrideMixedOptionsRef,
      overrideNamingPropsRef,
      renderOverrideItemRef,
    }),
    [collectionPath, values]
  );

  React.useImperativeHandle(handleChangeRef, () => onChange, [onChange]);

  React.useImperativeHandle(
    overrideMixedOptionsRef,
    () => overrideMixedOptions,
    [overrideMixedOptions]
  );

  React.useImperativeHandle(overrideNamingPropsRef, () => overrideNamingProps, [
    overrideNamingProps,
  ]);

  React.useImperativeHandle(renderOverrideItemRef, () => renderOverrideItem, [
    renderOverrideItem,
  ]);

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
