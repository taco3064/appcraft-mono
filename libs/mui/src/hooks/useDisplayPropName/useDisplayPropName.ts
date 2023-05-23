import { useMemo } from 'react';
import type { DisplayPropNameHook } from './useDisplayPropName.types';

const useDisplayPropName: DisplayPropNameHook = (propName) =>
  useMemo(
    () =>
      propName
        ?.replace(/([A-Z])/g, ' $1')
        .trim()
        .replace(/^./, (str) => str.toUpperCase()) || '',
    [propName]
  );

export default useDisplayPropName;
