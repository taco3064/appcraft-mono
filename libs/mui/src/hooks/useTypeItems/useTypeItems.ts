import _toPath from 'lodash.topath';
import { useState, useTransition } from 'react';
import type { PropTypesDef } from '@appcraft/types';

import { getPropPath } from '../usePropertyRouter';
import { usePropertiesSorting } from '../usePropertiesSorting';
import { EditedField, useStructure } from '../../contexts';
import type { TypeItemsHook } from './useTypeItems.types';

const useTypeItems: TypeItemsHook = (
  superior,
  { values: widgetValues, mixedTypes, onChange, onMixedTypeMapping }
) => {
  const [, setTransition] = useTransition();

  const { path, source, values } = useStructure(
    superior.type.startsWith('array') ? [] : {}
  );

  const [structure, setStructure] = useState(values);
  const properties = usePropertiesSorting(superior);

  const handleDelete = (fn: () => string) => {
    const propPath = getPropPath(source, [..._toPath(path), fn()]);

    delete mixedTypes?.[propPath];

    setStructure({ ...structure });
    onMixedTypeMapping({ ...mixedTypes });

    Object.entries(widgetValues).forEach(([field, options]) => {
      delete (options as Record<string, unknown>)?.[propPath];
      onChange(field as EditedField, { ...options });
    });
  };

  if (superior.type === 'exact') {
    return {
      items: properties.map((options) => ({
        key: options.propName as string,
        options,
      })),
    };
  }

  if (superior?.type === 'arrayOf' && Array.isArray(superior.options)) {
    return {
      items: superior.options.map((options) => ({
        key: options.propName as string,
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
          options,
          onDelete: () =>
            setTransition(() =>
              handleDelete(() => {
                delete (structure as Record<string, unknown>)[propName];
                setStructure({ ...structure });

                return propName;
              })
            ),
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
          options,
          onDelete: () =>
            setTransition(() =>
              handleDelete(() => {
                const arr = structure as [];

                arr.splice(i, 1);
                setStructure([...arr]);

                return i.toString();
              })
            ),
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
