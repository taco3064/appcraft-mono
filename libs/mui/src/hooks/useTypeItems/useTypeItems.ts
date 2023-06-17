import _toPath from 'lodash.topath';
import { startTransition, useState } from 'react';
import type { PropTypesDef, WidgetField } from '@appcraft/types';

import { BasicType, usePropertiesSorting } from '../usePropertiesSorting';
import { getPropPathBySource } from '../usePropertyRouter';
import { useCollection } from '../useCollection';
import type { ChangeHandler, OptionValues } from '../../contexts';
import type { TypeItemsHookResult } from './useTypeItems.types';

const useTypeItems = <V extends OptionValues>(
  superior: BasicType,
  widgetValues: V,
  onChange: ChangeHandler<V>
): TypeItemsHookResult => {
  const { path, source, values } = useCollection(
    superior.type.startsWith('array') ? [] : {}
  );

  const [structure, setStructure] = useState(values);
  const properties = usePropertiesSorting(superior);

  const handleDelete = (fn: () => string) =>
    startTransition(() => {
      const fields: WidgetField[] = ['nodes', 'props', 'todos'];
      const { mixedTypes } = widgetValues;
      const propPath = getPropPathBySource(source, [..._toPath(path), fn()]);

      delete mixedTypes?.[propPath];

      fields.forEach((field) => {
        const { [field as keyof V]: options } = widgetValues;

        delete (options as Record<string, unknown>)?.[propPath];
      });

      onChange({ ...widgetValues } as V);
    });

  if (superior.type === 'exact') {
    return {
      items: properties.map((options) => ({
        key: options.propName as string,
        collectionType: 'object',
        options,
      })),
    };
  }

  if (superior?.type === 'arrayOf' && Array.isArray(superior.options)) {
    return {
      items: superior.options.map((options) => ({
        key: options.propName as string,
        collectionType: 'array',
        options,
      })),
    };
  }

  if (/^object/.test(superior?.type)) {
    return {
      items: Object.keys(structure).map((propName) => {
        const options: PropTypesDef = {
          ...(superior?.options as PropTypesDef),
          propName,
        };

        return {
          key: propName,
          collectionType: 'object',
          options,
          onDelete: () =>
            handleDelete(() => {
              delete (structure as Record<string, unknown>)[propName];
              setStructure({ ...structure });

              return propName;
            }),
        };
      }),
      onItemAdd: () =>
        setStructure({
          ...structure,
          [`key_${Object.keys(structure).length}`]: null,
        }),
    };
  }

  if (superior?.type === 'arrayOf' && !Array.isArray(superior.options)) {
    return {
      items: Object.values(structure).map((_el, i) => {
        const options: PropTypesDef = {
          ...(superior?.options as PropTypesDef),
          propName: `[${i}]`,
        };

        return {
          key: `el_${i}`,
          collectionType: 'array',
          options,
          onDelete: () =>
            handleDelete(() => {
              const arr = structure as [];

              arr.splice(i, 1);
              setStructure([...arr]);

              return i.toString();
            }),
        };
      }),
      onItemAdd: () => setStructure([...((structure as []) || []), null]),
    };
  }

  return {
    items: [],
  };
};

export default useTypeItems;
