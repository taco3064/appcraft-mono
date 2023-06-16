import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Hooks from '../../hooks';
import { EditorProvider } from '../../contexts';
import { TypeList } from '../TypeList';
import { TypeListSkeleton } from '../TypeListSkeleton';
import type * as Types from './CraftedTypeEditor.types';

export default function CraftedTypeEditor<
  E extends Appcraft.NodeWidget | Appcraft.ConfigOptions,
  A extends Types.ActionElement = undefined
>({
  action,
  open = true,
  disableSelection,
  fixedT,
  parser,
  values,
  onChange,
}: Types.CraftedTypeEditorProps<E, A>) {
  const { typeFile, typeName, mixedTypes } = values as E;
  const ct = Hooks.useFixedT(fixedT);
  const [collectionPath, setCollectionPath] = useState('');

  const LazyTypeList = Hooks.useLazyTypeList<
    Hooks.BasicType,
    Types.LazyTypeListProps<E>
  >(
    parser,
    {
      typeFile,
      typeName,
      mixedTypes,
      collectionPath,
    },
    ({ fetchData, message, ...props }) =>
      !fetchData ? (
        <Typography
          variant="h6"
          color="text.secondary"
          justifyContent="center"
          lineHeight={3}
        >
          {message}
        </Typography>
      ) : (
        <TypeList {...props} superior={fetchData} />
      )
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
        {action}

        <Suspense fallback={<TypeListSkeleton />}>
          <LazyTypeList
            {...{
              disableSelection,
              onChange,
            }}
            message={ct('msg-select-widget-type-first')}
            values={values as E}
            onCollectionPathChange={setCollectionPath}
          />
        </Suspense>
      </Collapse>
    </EditorProvider>
  );
}
