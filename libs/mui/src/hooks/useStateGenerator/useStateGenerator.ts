import _get from 'lodash/get';
import { useEffect, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../utils';
import type * as Types from './useStateGenerator.types';

const useStateGenerator: Types.StateGeneratorHook = (
  typeFile,
  category,
  state
) => {
  const [stateValues, setStateValues] = useState(state);
  const [editing, setEditing] = useState<Types.EditingState>(null);

  useEffect(() => {
    console.log('====');
    setStateValues(state || {});
  }, [state]);

  return [
    { editing, stateValues },

    {
      clear: () => setEditing(null),

      edit: (path) => {
        const { [category]: target } = stateValues;

        console.log(category, path, stateValues);

        setEditing({
          path,
          config: Util.getStateConfig(typeFile, _get(target, [path])),
        });
      },

      change: (config) => {
        if (editing) {
          const { [category]: target, ...states } = stateValues;
          const { mixedTypes } = config;
          const newState = Util.getProps<Appcraft.WidgetState>(config);

          setEditing({ path: editing?.path || '', config });

          setStateValues({
            ...states,
            [category]: {
              ...target,
              [editing.path]: { ...newState, mixedTypes },
            },
          });
        }
      },
    },
  ];
};

export default useStateGenerator;
