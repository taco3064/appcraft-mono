import LinearProgress from '@mui/material/LinearProgress';
import { Suspense, useState } from 'react';

import { InteractivedProvider } from '../InteractivedContext';
import { useLazyTypeList } from './TypesEditor.hooks';
import type * as Types from './TypesEditor.types';

export default function TypesEditor({
  InputStyles,
  disableSelection,
  parser,
  typeFile,
  typeName,
  values,
  onChange,
}: Types.TypesEditorProps) {
  const [propPath, setPropPath] = useState<string>('');

  const LazyTypeList = useLazyTypeList({
    parser,
    propPath,
    typeFile,
    typeName,
  });

  return (
    <Suspense fallback={<LinearProgress />}>
      <InteractivedProvider {...{ InputStyles, propPath, values, onChange }}>
        <LazyTypeList
          disableSelection={disableSelection}
          values={values}
          onPropPathChange={setPropPath}
        />
      </InteractivedProvider>
    </Suspense>
  );
}
