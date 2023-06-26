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
      const propPath = getPropPathBySource(source, [..._toPath(path), fn()]);
      const { mixedTypes, props } = widgetValues;

      delete mixedTypes?.[propPath];
      delete props?.[propPath];

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
    const list = Object.keys(structure);

    return {
      ...(list.every((propName) => propName !== '*') && {
        onItemAdd: () => setStructure({ ...structure, '*': null }),
      }),
      items: list.map((propName) => {
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

          onRename: (newPropName) =>
            handleDelete(() => {
              const propPath = getPropPathBySource(source, [
                ..._toPath(path),
                propName,
              ]);

              const { mixedTypes, props } = widgetValues;
              const mixed = mixedTypes?.[propPath];
              const value = props?.[propPath];

              if (mixed) {
                mixedTypes[propPath] = mixed;
              }

              if (value) {
                props[propPath] = value;
              }

              delete (structure as Record<string, unknown>)[propName];
              setStructure({ ...structure, [newPropName]: value });

              return propName;
            }),
        };
      }),
    };
  }

  if (/^array/.test(superior?.type) && !Array.isArray(superior.options)) {
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
