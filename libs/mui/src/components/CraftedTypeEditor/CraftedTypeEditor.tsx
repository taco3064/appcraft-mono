import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { EditorProvider, useFixedT } from '../../contexts';
import { TypeList } from '../TypeList';
import { TypeListSkeleton } from '../TypeListSkeleton';
import { BasicType, useLazyTypeList } from '../../hooks';
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

  const LazyTypeList = useLazyTypeList<BasicType, Types.LazyTypeListProps<E>>(
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
