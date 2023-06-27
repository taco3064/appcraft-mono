import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';

import * as Hooks from '../../hooks';
import { EditorProvider, OptionValues } from '../../contexts';
import { TypeList } from '../TypeList';
import { TypeListSkeleton } from '../common';
import type * as Types from './CraftedTypeEditor.types';

export default function CraftedTypeEditor<
  V extends OptionValues,
  A extends Types.ActionElement = undefined
>({
  action,
  open = true,
  fixedT,
  parser,
  values,
  onChange,
}: Types.CraftedTypeEditorProps<V, A>) {
  const { typeFile, typeName, mixedTypes } = values as V;
  const ct = Hooks.useFixedT(fixedT);
  const [collectionPath, setCollectionPath] = useState('');

  const LazyTypeList = Hooks.useLazyTypeList<
    Hooks.BasicType,
    Types.LazyTypeListProps<V>
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
        <TypeList {...props} collection={fetchData} />
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
            message={ct('msg-select-widget-type-first')}
            values={values as V}
            onChange={onChange}
            onCollectionPathChange={setCollectionPath}
          />
        </Suspense>
      </Collapse>
    </EditorProvider>
  );
}
