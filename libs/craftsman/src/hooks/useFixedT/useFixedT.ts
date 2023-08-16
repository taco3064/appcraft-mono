import { useMemo } from 'react';

import { useEditorContext } from '../../contexts';
import type * as Types from './useFixedT.types';

const replaces: Types.Replaces = [
  { pattern: /^[^-]+-/, replacement: '' },
  {
    pattern: /-(.)/g,
    replacement: (_match, letter) => ` ${letter.toUpperCase()}`,
  },
  {
    pattern: /^./,
    replacement: (match) => match.toUpperCase(),
  },
];

export const useFixedT: Types.FixedTHook = (defaultFixedT) => {
  const { fixedT } = useEditorContext();

  return useMemo<Types.FixedT>(
    () =>
      fixedT ||
      defaultFixedT ||
      ((key) =>
        replaces.reduce<string>(
          (result, { pattern, replacement }) =>
            result.replace(pattern, replacement as string),
          key
        )),
    [defaultFixedT, fixedT]
  );
};
