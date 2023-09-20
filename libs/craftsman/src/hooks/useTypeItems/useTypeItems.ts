import _toPath from 'lodash/toPath';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useState } from 'react';
import type { PropTypesDef, StructureProp } from '@appcraft/types';

import { useCollection } from '../useCollection';
import { usePropertiesSorting } from '../usePropertiesSorting';
import type { ChangeHandler, OptionValues } from '../../contexts';
import type { TypeItem, TypeItemsHookResult } from './useTypeItems.types';

export const useTypeItems = <V extends OptionValues>(
  collection: StructureProp,
  exclude: RegExp[],
  widgetValues: V,
  onChange: ChangeHandler<V>
): TypeItemsHookResult => {
  const { path, values } = useCollection(
    collection.type.startsWith('array') ? [] : {}
  );

  const [structure, setStructure] = useState(values);
  const properties = usePropertiesSorting(collection);
  const paths = _toPath(path);

  const handleDelete = (fn: () => string) => {
    const propPath = ExhibitorUtil.getPropPath([...paths, fn()]);
    const { mixedTypes, props } = widgetValues;

    delete mixedTypes?.[propPath];

    for (const key of Object.keys(props || {})) {
      if (key.startsWith(propPath)) {
        delete props?.[key];
      }
    }

    onChange({ ...widgetValues } as V);
  };

  if (collection.type === 'exact') {
    return [
      properties.reduce<TypeItem[]>((result, options) => {
        const propPath = ExhibitorUtil.getPropPath([
          ...paths,
          options.propName as string,
        ]);

        if (exclude.every((e) => !e.test(propPath))) {
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
        const propPath = ExhibitorUtil.getPropPath([
          ...paths,
          options.propName as string,
        ]);

        if (exclude.every((e) => !e.test(propPath))) {
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
        const propPath = ExhibitorUtil.getPropPath([...paths, propName]);

        if (exclude.every((e) => !e.test(propPath))) {
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
                const propPath = ExhibitorUtil.getPropPath([
                  ..._toPath(path),
                  propName,
                ]);

                const newPropPath = ExhibitorUtil.getPropPath([
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
        const propPath = ExhibitorUtil.getPropPath([...paths, i]);

        if (exclude.every((e) => !e.test(propPath))) {
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
