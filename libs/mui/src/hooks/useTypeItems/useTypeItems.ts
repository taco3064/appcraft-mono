import _set from 'lodash.set';
import _toPath from 'lodash.topath';
import { startTransition, useState } from 'react';
import type { PropTypesDef } from '@appcraft/types';

import { BasicType, usePropertiesSorting } from '../usePropertiesSorting';
import { getPropPathBySource } from '../usePropertyRouter';
import { useCollection } from '../useCollection';
import type { ChangeHandler, OptionValues } from '../../contexts';
import type { TypeItemsHookResult } from './useTypeItems.types';

const useTypeItems = <V extends OptionValues>(
  collection: BasicType,
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
    return {
      items: properties.map((options) => ({
        key: options.propName as string,
        collectionType: 'object',
        options,
      })),
    };
  }

  if (collection?.type === 'arrayOf' && Array.isArray(collection.options)) {
    return {
      items: collection.options.map((options) => ({
        key: options.propName as string,
        collectionType: 'array',
        options,
      })),
    };
  }

  if (/^object/.test(collection?.type)) {
    const list = Object.keys({ ...values, ...structure });

    return {
      ...(list.every((propName) => propName) && {
        onItemAdd: () => setStructure({ ...structure, '': null }),
      }),
      items: list.map((propName) => {
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
    };
  }

  if (/^array/.test(collection?.type) && !Array.isArray(collection.options)) {
    const length = Math.max((values as []).length, (structure as []).length);

    console.log(values, structure, length);

    return {
      items: Array.from({ length }).map((_el, i) => {
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
      onItemAdd: () => setStructure([...((structure as []) || []), null]),
    };
  }

  return {
    items: [],
  };
};

export default useTypeItems;
