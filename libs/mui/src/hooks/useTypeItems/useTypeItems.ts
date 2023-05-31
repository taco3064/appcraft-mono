import type { PropTypesDef } from '@appcraft/types';

import { usePropertiesSorting } from '../usePropertiesSorting';
import { usePropValue } from '../../contexts';
import type { TypeItemsHook } from './useTypeItems.types';

const useTypeItems: TypeItemsHook = (superior) => {
  const properties = usePropertiesSorting(superior);
  const [value, onChange] = usePropValue<object>(superior?.propName);

  if (superior?.type === 'exact') {
    return {
      isModifiable: false,
      value,
      onChange,
      items: properties.map((options) => ({
        key: options.propName as string,
        options,
      })),
    };
  }

  if (/^object/.test(superior?.type)) {
    return {
      isModifiable: true,
      value,
      onChange,
      items: Object.keys(value || {}).map((propName) => {
        const options: PropTypesDef = {
          ...(superior?.options as PropTypesDef),
          propName,
        };

        return {
          key: propName,
          options,
          onDelete: () => {
            delete (value as Record<string, unknown>)[propName];
            onChange({ ...value });
          },
        };
      }),
    };
  }

  if (superior?.type === 'arrayOf' && Array.isArray(superior.options)) {
    return {
      isModifiable: false,
      value,
      onChange,
      items: superior.options.map((options) => ({
        key: options.propName as string,
        options,
      })),
    };
  }

  if (
    superior?.type === 'arrayOf' &&
    !Array.isArray(superior.options) &&
    Array.isArray(value)
  ) {
    return {
      isModifiable: true,
      value,
      onChange,
      items: value.map((_el, i) => {
        const options: PropTypesDef = {
          ...(superior?.options as PropTypesDef),
          propName: `[${i}]`,
        };

        return {
          key: `el_${i}`,
          options,
          onDelete: () => {
            value.splice(i, 1);
            onChange([...value]);
          },
        };
      }),
    };
  }

  return {
    isModifiable: false,
    items: [],
    value,
    onChange,
  };
};

export default useTypeItems;
