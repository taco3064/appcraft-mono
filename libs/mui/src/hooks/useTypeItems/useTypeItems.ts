import _topath from 'lodash/topath';
import { startTransition, useState } from 'react';
import type { PropTypesDef, StructureProp } from '@appcraft/types';

import { getPropPath, getPropPathBySource } from '../../utils';
import { useCollection } from '../useCollection';
import { usePropertiesSorting } from '../usePropertiesSorting';
import type { ChangeHandler, OptionValues } from '../../contexts';
import type { TypeItem, TypeItemsHookResult } from './useTypeItems.types';

const useTypeItems = <V extends OptionValues>(
  collection: StructureProp,
  exclude: string[],
  widgetValues: V,
  onChange: ChangeHandler<V>
): TypeItemsHookResult => {
  const { path, source, values } = useCollection(
    collection.type.startsWith('array') ? [] : {}
  );

  const [structure, setStructure] = useState(values);
  const properties = usePropertiesSorting(collection);
  const paths = _topath(path);

  const handleDelete = (fn: () => string) =>
    startTransition(() => {
      const propPath = getPropPathBySource(source, [...paths, fn()]);
      const { mixedTypes, props } = widgetValues;

      delete mixedTypes?.[propPath];
      delete props?.[propPath];

      onChange({ ...widgetValues } as V);
    });

  if (collection.type === 'exact') {
    return [
      properties.reduce<TypeItem[]>((result, options) => {
        const propPath = getPropPath([...paths, options.propName as string]);

        if (!exclude.includes(propPath)) {
          result.push({
            key: options.propName as string,
            collectionType: 'object',
            options,
          });
        }

        return result;
      }, []),
    ];
  }

  if (collection?.type === 'arrayOf' && Array.isArray(collection.options)) {
    return [
      collection.options.reduce<TypeItem[]>((result, options) => {
        const propPath = getPropPath([...paths, options.propName as string]);

        if (!exclude.includes(propPath)) {
          result.push({
            key: options.propName as string,
            collectionType: 'array',
            options,
          });
        }

        return result;
      }, []),
    ];
  }

  if (/^object/.test(collection?.type)) {
    const list = Object.keys({ ...values, ...structure });
    const isAddable = list.every((propName) => propName);

    return [
      list.reduce<TypeItem[]>((result, propName) => {
        const propPath = getPropPath([...paths, propName]);

        if (!exclude.includes(propPath)) {
          const options: PropTypesDef = {
            ...(collection?.options as PropTypesDef),
            propName,
          };

          result.push({
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
                  ..._topath(path),
                  propName,
                ]);

                const newPropPath = getPropPathBySource(source, [
                  ..._topath(path),
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
          });
        }

        return result;
      }, []),

      !isAddable
        ? (undefined as never)
        : () => setStructure({ ...structure, '': null }),
    ];
  }

  if (/^array/.test(collection?.type) && !Array.isArray(collection.options)) {
    const length = Math.max((values as []).length, (structure as []).length);

    return [
      Array.from({ length }).reduce<TypeItem[]>((result, _el, i) => {
        const propPath = getPropPath([...paths, i]);

        if (!exclude.includes(propPath)) {
          const options: PropTypesDef = {
            ...(collection?.options as PropTypesDef),
            propName: `[${i}]`,
          };

          result.push({
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
          });
        }

        return result;
      }, []),

      () => setStructure([...((structure as []) || []), null]),
    ];
  }

  return [[]];
};

export default useTypeItems;
