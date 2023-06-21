import { useEditorContext } from '../../contexts';
import type * as Types from './useMixedTypeMapping.types';

const useMixedTypeMapping: Types.MixedTypeMappingHook = (propPath: string) => {
  const {
    values: { mixedTypes, ...values },
    onChange,
  } = useEditorContext();

  return [
    mixedTypes?.[propPath] || null,

    (mixedText) => {
      if (mixedText) {
        onChange({
          ...values,
          mixedTypes: { ...mixedTypes, [propPath]: mixedText },
        });
      } else {
        const { props } = values;

        delete mixedTypes?.[propPath];

        Object.keys(props || {}).forEach((path) => {
          if (path.startsWith(propPath)) {
            delete props?.[path];
          }
        });

        onChange({ ...values, mixedTypes });
      }
    },
  ];
};

export default useMixedTypeMapping;
