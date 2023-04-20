import LinearProgress from '@mui/material/LinearProgress';
import { Suspense, useState } from 'react';

import { InteractivedProvider } from '../InteractivedContext';
import { useLazyTypeList } from './TypesEditor.hooks';
import type * as Types from './TypesEditor.types';

export default function TypesEditor<V extends object>({
  InputStyles,
  parser,
  typeFile,
  typeName,
  values,
}: Types.TypesEditorProps<V>) {
  const [propPath, setPropPath] = useState<string>('');

  const LazyTypeList = useLazyTypeList({
    parser,
    propPath,
    typeFile,
    typeName,
  });

  return (
    <Suspense fallback={<LinearProgress />}>
      <InteractivedProvider InputStyles={InputStyles} values={values}>
        <LazyTypeList />
      </InteractivedProvider>
    </Suspense>
  );
}
