import _get from 'lodash/get';
import { useEditorContext } from '../../contexts';

const usePropValue = <P = unknown>(propPath: string) => {
  const { values, onChange } = useEditorContext();

  return [
    (_get(values, ['props', propPath]) as P) || null,

    (value: P | null) => {
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
  ] as [P | null, (value: P | null) => void];
};

export default usePropValue;
