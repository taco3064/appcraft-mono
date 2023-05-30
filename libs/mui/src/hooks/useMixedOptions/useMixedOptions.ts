import { useMemo } from 'react';
import type { OneOfTypeProp } from '@appcraft/types';

import { useMixedTypeMapping } from '../../contexts';
import type { MixedOptionsHook } from './useMixedOptions.types';

const useMixedOptions: MixedOptionsHook = (category, options) => {
  const isMixed = /^(Node|Mixed)$/.test(category || '');
  const [selected, setSelected] = useMixedTypeMapping(options.propName);

  const mixedOptions = useMemo<OneOfTypeProp | null>(() => {
    switch (category) {
      case 'Mixed':
        return options as OneOfTypeProp;
      case 'Node': {
        const { propName, required } = options;

        return {
          type: 'oneOfType',
          propName,
          required,
          options: [
            { type: 'string', text: 'string', propName, required },
            {
              type: options.type,
              text: options.type === 'element' ? 'Element' : 'Node',
              propName,
              required,
            },
          ],
        };
      }
      default:
        return null;
    }
  }, [category, options]);

  return !isMixed
    ? null
    : {
        horizontal: selected ? 'right' : 'center',
        matched: mixedOptions?.options?.find(({ text }) => text === selected),
        propType: mixedOptions as OneOfTypeProp,
        selected,
        setSelected,
      };
};

export default useMixedOptions;
