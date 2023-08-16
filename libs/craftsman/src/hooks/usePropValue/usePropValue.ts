import _get from 'lodash/get';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useMemo } from 'react';

import { useEditorContext } from '../../contexts';
import type { PropValueHookResult } from './usePropValue.types';

export const usePropValue = <P = unknown>(
  type: 'display' | 'pure',
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
        if (type === 'pure') {
          return _get(JSON.parse(stringify), [propPath]) || null;
        }

        const props = ExhibitorUtil.getProps(
          Object.entries(JSON.parse(stringify)).reduce(
            (result, [path, value]) => ({
              ...result,
              ...(path.startsWith(propPath) && { [path]: value }),
            }),
            {}
          )
        );

        return _get(props, propPath) || null;
      }, [type, stringify, propPath]),
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
