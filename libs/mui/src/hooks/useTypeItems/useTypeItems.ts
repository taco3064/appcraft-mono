import _toPath from 'lodash.topath';
import { startTransition, useState } from 'react';
import type { PropTypesDef, StructureProp } from '@appcraft/types';

import { getPropPathBySource } from '../usePropertyRouter';
import { useCollection } from '../useCollection';
import { usePropertiesSorting } from '../usePropertiesSorting';
import type { ChangeHandler, OptionValues } from '../../contexts';
import type { TypeItemsHookResult } from './useTypeItems.types';

const useTypeItems = <V extends OptionValues>(
  collection: StructureProp,
  widgetValues: V,
  onChange: ChangeHandler<V>
): TypeItemsHookResult => {
  const { path, source, values } = useCollection(
    collection.type.startsWith('array') ? [] : {}
  );

  const [structure, setStructure] = useState(values);
  const properties = usePropertiesSorting(collection);

  const handleDelete = (fn: () => string) =>
    startTransition(() => {
      const propPath = getPropPathBySource(source, [..._toPath(path), fn()]);
      const { mixedTypes, props } = widgetValues;

      delete mixedTypes?.[propPath];
      delete props?.[propPath];

      onChange({ ...widgetValues } as V);
    });

  if (collection.type === 'exact') {
    return [
      properties.map((options) => ({
        key: options.propName as string,
        collectionType: 'object',
        options,
      })),
    ];
  }

  if (collection?.type === 'arrayOf' && Array.isArray(collection.options)) {
    return [
      collection.options.map((options) => ({
        key: options.propName as string,
        collectionType: 'array',
        options,
      })),
    ];
  }

  if (/^object/.test(collection?.type)) {
    const list = Object.keys({ ...values, ...structure });
    const isAddable = list.every((propName) => propName);

    return [
      list.map((propName) => {
        const options: PropTypesDef = {
          ...(collection?.options as PropTypesDef),
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

          onRename: (newPropName) => {
            if (newPropName in values) {
              return false;
            }

            handleDelete(() => {
              const propPath = getPropPathBySource(source, [
                ..._toPath(path),
                propName,
              ]);

              const newPropPath = getPropPathBySource(source, [
                ..._toPath(path),
                newPropName,
              ]);

              const { mixedTypes, props } = widgetValues;
              const mixed = mixedTypes?.[propPath];
              const value = props?.[propPath];

              if (mixed) {
                mixedTypes[newPropPath] = mixed;
              }

              widgetValues.props = { ...props, [newPropPath]: value || null };

              delete (structure as Record<string, unknown>)[propName];
              setStructure({ ...structure, [newPropName]: value });

              return propName;
            });

            return true;
          },
        };
      }),

      !isAddable
        ? (undefined as never)
        : () => setStructure({ ...structure, '': null }),
    ];
  }

  if (/^array/.test(collection?.type) && !Array.isArray(collection.options)) {
    const length = Math.max((values as []).length, (structure as []).length);

    return [
      Array.from({ length }).map((_el, i) => {
        const options: PropTypesDef = {
          ...(collection?.options as PropTypesDef),
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

      () => setStructure([...((structure as []) || []), null]),
    ];
  }

  return [[]];
};

export default useTypeItems;
