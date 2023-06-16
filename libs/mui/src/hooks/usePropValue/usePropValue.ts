import type * as Appcraft from '@appcraft/types';
import { OptionValues, useEditorContext } from '../../contexts';

const usePropValue = <V extends OptionValues, P = unknown>(
  collectionType: Appcraft.CollectionType,
  widgetField: keyof V,
  propName: string
) => {
  const fields: Appcraft.WidgetField[] = ['events', 'nodes', 'props'];
  const { collectionPath, values, onChange } = useEditorContext<V>();

  const propPath =
    collectionType === 'array'
      ? `${collectionPath}[${propName}]`
      : `${collectionPath ? `${collectionPath}.` : ''}${propName}`;

  return {
    path: propPath,

    value:
      (Object.assign(
        {},
        ...fields.map((field) => {
          const { [field as keyof V]: options = {} } = values;

          return options;
        })
      )[propPath] as P) || null,

    onChange: (value: P | null) => {
      const { [widgetField]: target } = values;

      delete (target as Record<string, unknown>)?.[propPath];

      onChange({
        ...values,
        [widgetField]: {
          ...target,
          ...((value || value === 0) && { [propPath]: value }),
        },
      } as V);
    },
  };
};

export default usePropValue;
