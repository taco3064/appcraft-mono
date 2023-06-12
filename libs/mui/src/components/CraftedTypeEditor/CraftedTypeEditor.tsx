import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Suspense, lazy, useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { EditorProvider, useFixedT } from '../../contexts';
import { TypeList } from '../TypeList';
import { TypeListSkeleton } from '../TypeListSkeleton';
import type * as Types from './CraftedTypeEditor.types';

export default function CraftedTypeEditor<
  A extends Types.ActionElement = undefined,
  E extends Appcraft.NodeWidget | Appcraft.ConfigOptions = Appcraft.NodeWidget
>({
  action,
  open = true,
  disableSelection,
  fixedT,
  parser,
  values,
  onChange,
}: Types.CraftedTypeEditorProps<A, E>) {
  const { typeFile, typeName, mixedTypes } = values as E;
  const ct = useFixedT(fixedT);
  const [collectionPath, setCollectionPath] = useState('');

  const LazyTypeList = useMemo(
    () =>
      lazy(async () => {
        const isValid = Boolean(typeFile && typeName);

        const { data } = !isValid
          ? { data: null }
          : await axios({
              ...parser,
              data: {
                typeFile,
                typeName,
                mixedTypes,
                collectionPath,
              },
            });

        return {
          default: ({ invalidMessage, ...props }) =>
            !data ? (
              <Typography
                variant="h6"
                color="text.secondary"
                justifyContent="center"
                lineHeight={3}
              >
                {invalidMessage}
              </Typography>
            ) : (
              <TypeList {...props} superior={data} />
            ),
        };
      }),
    [parser, typeFile, typeName, mixedTypes, collectionPath]
  );

  return (
    <EditorProvider
      {...{
        fixedT,
        collectionPath,
        values,
        onChange,
      }}
    >
      <Collapse in={open}>
        {action && (
          <>
            {action}
            <Divider />
          </>
        )}

        <Suspense fallback={<TypeListSkeleton />}>
          <LazyTypeList
            {...{
              disableSelection,
              values,
              onChange,
            }}
            invalidMessage={ct('msg-select-widget-type-first')}
            onCollectionPathChange={setCollectionPath}
          />
        </Suspense>
      </Collapse>
    </EditorProvider>
  );
}
