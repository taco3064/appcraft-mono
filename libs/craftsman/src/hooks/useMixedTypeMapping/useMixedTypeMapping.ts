import { useEditorContext } from '../../contexts';
import type * as Types from './useMixedTypeMapping.types';

const useMixedTypeMapping: Types.MixedTypeMappingHook = (propPath, options) => {
  const {
    values: { mixedTypes, ...values },
    onChange,
  } = useEditorContext();

  return [
    mixedTypes?.[propPath] || null,

    (mixedText) => {
      const { props } = values;

      if (mixedText) {
        const matched = options.find(({ text }) => text === mixedText);

        const isOnlyOne =
          matched?.type === 'oneOf' && matched.options?.length === 1;

        onChange({
          ...values,
          mixedTypes: { ...mixedTypes, [propPath]: mixedText },
          props: {
            ...props,
            ...(isOnlyOne && {
              [propPath]: matched?.options?.[0],
            }),
          },
        });
      } else {
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
