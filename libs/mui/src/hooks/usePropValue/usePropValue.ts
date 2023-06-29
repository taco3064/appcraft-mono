import _get from 'lodash.get';
import { useEditorContext } from '../../contexts';

const usePropValue = <P = unknown>(propPath: string) => {
  const { values, onChange } = useEditorContext();

  return {
    path: propPath,
    value: (_get(values, ['props', propPath]) as P) || null,

    onChange: (value: P | null) => {
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
  };
};

export default usePropValue;
