import axios from 'axios';
import { lazy, useMemo } from 'react';

import { TypeList } from '../TypeList';
import type { LazyTypeListHook } from './TypesEditor.types';

export const useLazyTypeList: LazyTypeListHook = ({
  parser,
  typeFile,
  typeName,
  propPath,
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
          },
        });

        return {
          default: () => <TypeList superior={data} />,
        };
      }),
    [parser, typeFile, typeName, propPath]
  );
