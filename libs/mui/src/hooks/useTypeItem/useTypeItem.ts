import { useMemo } from 'react';

import { getPropOrderSeq, getPropPath } from '../../utils';
import { useEditorContext } from '../../contexts';
import type * as Types from './useTypeItem.types';

const useTypeItem: Types.TypeItemHook = (
  collectionType,
  { type, propName }
) => {
  const { collectionPath } = useEditorContext();

  return {
    label: propName || '',
    propPath: getPropPath([collectionPath, propName as string]),

    category: useMemo<Types.Category | null>(() => {
      switch (getPropOrderSeq(type)) {
        case 0:
          return 'Node';
        case 1:
        case 4:
          return 'Display';

        case 2:
          return 'Mixed';

        case 3:
          return 'Pure';

        default:
          return null;
      }
    }, [type]),
  };
};

export default useTypeItem;
