import { useMemo } from 'react';
import type { PropTypesDef } from '@appcraft/types';

import type { Category } from '../TypeFields';
import type { GetTypeSeqFn } from './TypeItem.types';

export const getTypeSeq: GetTypeSeqFn = (type) => {
  if (/^(arrayOf|exact|func|object|objectOf)$/.test(type)) {
    return 0;
  }

  if (/^(oneOfType)$/.test(type)) {
    return 1;
  }

  if (/^(bool|instanceOf|number|oneOf|string)$/.test(type)) {
    return 4;
  }

  return -1;
};

export const useTypeField = <P extends PropTypesDef>({ type }: P) =>
  useMemo<Category | null>(() => {
    switch (getTypeSeq(type)) {
      case 0:
        return 'Display';

      case 1:
        return 'Mixed';

      case 4:
        return 'Pure';

      default:
        return null;
    }
  }, [type]);
