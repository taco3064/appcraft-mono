import List, { ListProps } from '@mui/material/List';
import axios from 'axios';
import { lazy, useEffect, useMemo, useState, useTransition } from 'react';
import type { PropTypesDef } from '@appcraft/types';

import type { LazyTypesDefHook } from './TypesEditor.types';

export const useLazyTypesDef: LazyTypesDefHook = ({
  parser,
  typeFile,
  typeName,
  propPath,
}) => {
  const [, startTransition] = useTransition();
  const [typesDef, setTypesDef] = useState<PropTypesDef | null>(null);

  return [
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
            default: (props: ListProps) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useEffect(() => startTransition(() => setTypesDef(data)), []);

              return <List {...props} />;
            },
          };
        }),
      [parser, typeFile, typeName, propPath]
    ),
    typesDef,
  ];
};
