import LinearProgress from '@mui/material/LinearProgress';
import { Suspense } from 'react';

import { InteractivedProvider } from '../InteractivedContext';
import { useLazyTypeList } from './TypesEditor.hooks';
import type * as Types from './TypesEditor.types';

export default function TypesEditor({
  InputStyles,
  parser,
  typeFile,
  typeName,
  values,
  onChange,
}: Types.TypesEditorProps) {
  const LazyTypeList = useLazyTypeList({
    parser,
    typeFile,
    typeName,
  });

  return (
    <Suspense fallback={<LinearProgress />}>
      <InteractivedProvider {...{ InputStyles, values, onChange }}>
        <LazyTypeList />
      </InteractivedProvider>
    </Suspense>
  );
}
