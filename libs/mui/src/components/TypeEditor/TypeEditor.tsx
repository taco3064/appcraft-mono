import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import { Suspense, lazy, useMemo, useState } from 'react';

import { EditorProvider } from '../../contexts';
import { TypeList } from '../TypeList';
import { TypeListSkeleton } from '../TypeListSkeleton';
import type { TypeEditorProps } from './TypeEditor.types';

export default function TypeEditor({
  action,
  disableSelection,
  fixedT,
  mixedTypes,
  parser,
  typeFile,
  typeName,
  values,
  onChange,
  onMixedTypeMapping,
}: TypeEditorProps) {
  const [collectionPath, setCollectionPath] = useState('');

  const LazyTypeList = useMemo(
    () =>
      lazy(async () => {
        const { data } = await axios({
          ...parser,
          data: {
            typeFile,
            typeName,
            propPath: collectionPath,
            mixedTypes,
          },
        });

        return {
          default: (props) => <TypeList {...props} superior={data} />,
        };
      }),
    [parser, typeFile, typeName, collectionPath, mixedTypes]
  );

  return (
    <EditorProvider
      {...{
        fixedT,
        mixedTypes,
        collectionPath,
        values,
        onChange,
        onMixedTypeMapping,
      }}
    >
      {action}

      <Suspense fallback={<TypeListSkeleton />}>
        <LazyTypeList
          {...{
            disableSelection,
            mixedTypes,
            values,
            onChange,
            onMixedTypeMapping,
          }}
          onPropPathChange={setCollectionPath}
        />
      </Suspense>
    </EditorProvider>
  );
}
