import _get from 'lodash/get';

import { useEditorContext } from '../../contexts';
import type { PropValueHookResult } from './usePropValue.types';

const usePropValue = <P = unknown>(
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

export default usePropValue;
