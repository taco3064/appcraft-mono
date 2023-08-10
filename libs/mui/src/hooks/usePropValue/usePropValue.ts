import _get from 'lodash/get';
import { useMemo } from 'react';

import { getProps } from '../../utils';
import { useEditorContext } from '../../contexts';
import type { PropValueHookResult } from './usePropValue.types';

export const useDisplayValue = <P = unknown>(
  propPath: string
): PropValueHookResult<P> => {
  const { values, renderOverrideItem, onChange } = useEditorContext();
  const { typeFile, typeName, props } = values;
  const stringify = JSON.stringify(props || {});

  return [
    {
      typeFile,
      typeName,

      value: useMemo<P>(() => {
        const props = getProps(
          Object.entries(JSON.parse(stringify)).reduce(
            (result, [path, value]) => ({
              ...result,
              ...(path.startsWith(propPath) && { [path]: value }),
            }),
            {}
          )
        );

        return _get(props, propPath) || null;
      }, [stringify, propPath]),
    },

    {
      renderOverride: renderOverrideItem,

      change: (value: P | null) => {
        const { props: target } = values;

        delete (target as Record<string, unknown>)?.[propPath];

        onChange({
          ...values,
          props: {
            ...target,
            ...(value != null && { [propPath]: value }),
          },
        });
      },
    },
  ];
};

export const usePropValue = <P = unknown>(
  propPath: string
): PropValueHookResult<P> => {
  const { values, renderOverrideItem, onChange } = useEditorContext();
  const { typeFile, typeName } = values;

  return [
    {
      value: (_get(values, ['props', propPath]) as P) || null,
      typeFile,
      typeName,
    },

    {
      renderOverride: renderOverrideItem,

      change: (value: P | null) => {
        const { props: target } = values;

        delete (target as Record<string, unknown>)?.[propPath];

        onChange({
          ...values,
          props: {
            ...target,
            ...(value != null && { [propPath]: value }),
          },
        });
      },
    },
  ];
};
