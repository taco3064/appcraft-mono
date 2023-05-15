import axios from 'axios';
import { lazy, useMemo } from 'react';

import { TypeList } from '../TypeList';
import type { LazyTypeListHook } from './TypesEditor.types';

export const useLazyTypeList: LazyTypeListHook = ({
  parser,
  propPath,
  typeFile,
  typeName,
  mixedTypes,
  filters,
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
            filters,
          },
        });

        return {
          default: (props) => <TypeList {...props} superior={data} />,
        };
      }),
    [parser, typeFile, typeName, propPath, mixedTypes, filters]
  );
