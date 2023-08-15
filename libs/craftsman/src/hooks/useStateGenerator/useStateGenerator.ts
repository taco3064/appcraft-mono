import _get from 'lodash/get';
import { useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../utils';
import type * as Types from './useStateGenerator.types';

const useStateGenerator: Types.StateGeneratorHook = (
  typeFile,
  category,
  widget,
  onChange
) => {
  const [editing, setEditing] = useState<Types.EditingState>(null);

  return [
    editing,

    {
      clear: () => setEditing(null),

      change: (config) => {
        if (editing) {
          const { mixedTypes } = config;
          const newState = Util.getProps<Appcraft.WidgetState>(config.props);

          const { [category]: target, ...states } =
            _get(widget, ['state']) || {};

          setEditing({ path: editing?.path || '', config });

          onChange({
            ...widget,
            state: {
              ...states,
              [category]: {
                ...target,
                [editing.path]: { ...newState, mixedTypes },
              },
            },
          });
        }
      },

      edit: (path) => {
        const { [category]: target } = _get(widget, ['state']) || {};

        setEditing({
          path,
          config: Util.getStateConfig(typeFile, _get(target, [path])),
        });
      },

      remove: (path) => {
        const { [category]: target = {}, ...states } =
          _get(widget, ['state']) || {};

        delete target[path];

        onChange({
          ...widget,
          state: { ...states, [category]: target },
        });
      },
    },
  ];
};

export default useStateGenerator;
