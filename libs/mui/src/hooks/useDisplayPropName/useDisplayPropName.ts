import { useMemo } from 'react';

import { getDisplayPropName } from './useDisplayPropName.utils';
import type { DisplayPropNameHook } from './useDisplayPropName.types';

const useDisplayPropName: DisplayPropNameHook = (propName) =>
  useMemo(() => getDisplayPropName(propName), [propName]);

export default useDisplayPropName;
