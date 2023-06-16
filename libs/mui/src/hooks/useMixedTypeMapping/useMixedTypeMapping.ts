import type * as Appcraft from '@appcraft/types';

import { OptionValues, useEditorContext } from '../../contexts';
import { usePropValue } from '../usePropValue';
import type { MixedTypeMappingResult } from './useMixedTypeMapping.types';

const useMixedTypeMapping = <V extends OptionValues>(
  collectionType: Appcraft.CollectionType,
  widgetField: keyof V,
  propName: string
) => {
  const {
    values: { mixedTypes, ...values },
    onChange,
  } = useEditorContext();

  const { path: propPath } = usePropValue<V>(
    collectionType,
    widgetField,
    propName
  );

  return [
    mixedTypes?.[propPath] || null,

    (mixedText) => {
      if (mixedText) {
        onChange({
          ...values,
          mixedTypes: { ...mixedTypes, [propPath]: mixedText },
        } as V);
      } else {
        const fields: Appcraft.WidgetField[] = ['events', 'nodes', 'props'];

        delete mixedTypes?.[propPath];

        fields.forEach((field) => {
          const { [field as keyof V]: options = {} } = values;

          Object.keys(options as Record<string, unknown>).forEach((path) => {
            if (path.startsWith(propPath)) {
              delete (options as Record<string, unknown>)[path];
            }
          });
        });

        onChange({ ...values } as V);
      }
    },
  ] as MixedTypeMappingResult;
};

export default useMixedTypeMapping;
