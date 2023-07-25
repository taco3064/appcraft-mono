import { useImperativeHandle, useRef, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../utils';
import type * as Types from './useStateGenerator.types';

const useStateGenerator: Types.StateGeneratorHook = (
  typeFile,
  category,
  state
) => {
  const stateRef = useRef<Types.StateValues>(state);

  const [config, setConfig] = useState<Appcraft.ConfigOptions>(() =>
    Util.getStateConfig(typeFile, category, state)
  );

  useImperativeHandle(
    stateRef,
    () => {
      const { mixedTypes: overrideMixedTypes = {} } = config;
      const edited = Util.getProps<Types.EditedState<typeof category>>(config);

      const {
        mixedTypes = {},
        [category]: target,
        ...result
      } = stateRef.current || {};

      return {
        ...result,
        [category]: edited,
        mixedTypes: {
          ...mixedTypes,
          ...Object.entries(overrideMixedTypes).reduce<typeof mixedTypes>(
            (acc, [path, type]) => ({
              ...acc,
              [`${category}.${path}`]: type,
            }),
            {}
          ),
        },
      };
    },
    [category, config]
  );

  return [
    { config, valuesRef: stateRef },

    {
      active: (newCategory) =>
        setConfig(Util.getStateConfig(typeFile, newCategory, state)),

      change: (config) => setConfig(config),
    },
  ];
};

export default useStateGenerator;
