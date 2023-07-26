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
  const [editing, setEditing] = useState<Types.EditingState>(null);

  const [stateValues, setStateValues] = useState(() =>
    JSON.parse(JSON.stringify(state || {}))
  );

  useEffect(() => {
    setStateValues(JSON.parse(JSON.stringify(state || {})));
  }, [state]);

  return [
    { editing, stateValues },

    {
      clear: () => setEditing(null),

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

      edit: (path) => {
        const { [category]: target } = stateValues;

        setEditing({
          path,
          config: Util.getStateConfig(typeFile, _get(target, [path])),
        });
      },

      remove: (path) => {
        const { [category]: target, ...states } = stateValues;

        delete target[path];
        setStateValues({ ...states, [category]: target });
      },
    },
  ];
};

export default useStateGenerator;
