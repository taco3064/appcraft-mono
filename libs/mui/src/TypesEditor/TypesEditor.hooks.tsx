import Paper, { PaperProps } from '@mui/material/Paper';
import axios from 'axios';
import { lazy, useEffect, useMemo, useState } from 'react';
import type { PropTypesDef } from '@appcraft/types';

import type { LazyTypesDefHook } from './TypesEditor.types';

export const useLazyTypesDef: LazyTypesDefHook = ({
  parser,
  typeFile,
  typeName,
  propPath,
}) => {
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

          // setTypesDef(data);

          return {
            default: (props: PaperProps) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useEffect(() => {
                setTypesDef(data);
              }, []);

              return <Paper {...props} />;
            },
          };
        }),
      [parser, typeFile, typeName, propPath]
    ),
    typesDef,
  ];
};
