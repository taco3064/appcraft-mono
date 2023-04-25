import { FC, useMemo } from 'react';
import type { PropTypesDef } from '@appcraft/types';

import * as Fields from '../TypeFields';
import type { GetTypeSeqFn } from './TypeItem.types';

export const getTypeSeq: GetTypeSeqFn = (type) => {
  if (/^(arrayOf|exact|func|object|objectOf)$/.test(type)) {
    return 0;
  }

  if (/^(bool|instanceOf|number|oneOf|string)$/.test(type)) {
    return 4;
  }

  return -1;
};

export const useTypeField = <P extends PropTypesDef>({ type }: P) =>
  useMemo<[FC<Fields.BaseFieldProps<P>> | null, boolean]>(() => {
    switch (getTypeSeq(type)) {
      case 0:
        return [Fields.DisplayField as FC<Fields.BaseFieldProps<P>>, true];

      case 4:
        return [Fields.PureField as FC<Fields.BaseFieldProps<P>>, false];

      default:
        return [null, false];
    }
  }, [type]);
