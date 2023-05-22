import axios from 'axios';
import { lazy, useMemo } from 'react';

import { TypeList } from '../TypeList';
import type { LazyTypeListHook } from './CraftedEditor.types';

export const useLazyTypeList: LazyTypeListHook = ({
  parser,
  propPath,
  typeFile,
  typeName,
  mixedTypes,
}) =>
  useMemo(
    () =>
      lazy(async () => {
        const { data } = await axios({
          ...parser,
          data: {
            typeFile,
            typeName,
            propPath,
            mixedTypes,
          },
        });

        return {
          default: (props) => <TypeList {...props} superior={data} />,
        };
      }),
    [parser, typeFile, typeName, propPath, mixedTypes]
  );
