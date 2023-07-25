import { useState } from 'react';

import * as Util from '../../utils';
import type { StateGeneratorHook } from './useStateGenerator.types';

const useStateGenerator: StateGeneratorHook = (typeFile, category, state) => {
  const [editing, setEditing] = useState<Util.EditingState<typeof category>>(
    () => Util.getEditingState(typeFile, category, state)
  );

  return [
    editing,
    {
      change: () => null,
    },
  ];
};

export default useStateGenerator;
