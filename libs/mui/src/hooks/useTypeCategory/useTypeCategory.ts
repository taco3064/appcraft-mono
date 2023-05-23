import { useMemo } from 'react';
import type { PropTypesDef } from '@appcraft/types';

import { getOrderSeq } from './useTypeCategory.utils';
import type { Category } from './useTypeCategory.types';

const useTypeCategory = <P extends PropTypesDef>({ type }: P) =>
  useMemo<Category | null>(() => {
    switch (getOrderSeq(type)) {
      case 0:
      case 5:
        return 'Display';

      case 1:
        return 'Mixed';

      case 4:
        return 'Pure';

      default:
        return null;
    }
  }, [type]);

export default useTypeCategory;
