import { FC, useMemo } from 'react';
import type { PropTypesDef } from '@appcraft/types';

import * as Fields from '../TypeFields';

export const useTypeField = <P extends PropTypesDef>({ type }: P) =>
  useMemo<[FC<Fields.BaseFieldProps<P>> | null, boolean]>(() => {
    if (/^(arrayOf|exact|func|object|objectOf)$/.test(type)) {
      return [Fields.DisplayField as FC<Fields.BaseFieldProps<P>>, true];
    }

    if (/^(bool|instanceOf|number|oneOf|string)$/.test(type)) {
      return [Fields.PureField as FC<Fields.BaseFieldProps<P>>, false];
    }

    return [null, false];
  }, [type]);

// {
//   const { type } = options;

//   return useMemo<FC<Fields.BaseFieldProps<typeof options>> | null>(() => {
//     switch (type) {

//       // case 'oneOfType':
//       //   return 'mixed';

//       // case 'element':
//       // case 'node':
//       //   return 'node';

//       default:
//         return null;
//     }
//   }, [type]);
// };
