import { Suspense, useState } from 'react';

import { InteractivedProvider } from '../InteractivedContext';
import { TypeListSkeleton } from '../TypeListSkeleton';
import { useLazyTypeList } from './TypesEditor.hooks';
import type * as Types from './TypesEditor.types';

export default function TypesEditor({
  disableSelection,
  parser,
  typeFile,
  typeName,
  mixedTypes,
  values,
  onChange,
  onMixedTypeMapping,
}: Types.TypesEditorProps) {
  const [propPath, setPropPath] = useState('');

  const LazyTypeList = useLazyTypeList({
    parser,
    propPath,
    typeFile,
    typeName,
    mixedTypes,
  });

  return (
    <Suspense fallback={<TypeListSkeleton />}>
      <InteractivedProvider
        {...{
          propPath,
          mixedTypes,
          values,
          onChange,
          onMixedTypeMapping,
        }}
      >
        <LazyTypeList
          {...{ disableSelection, values }}
          onPropPathChange={setPropPath}
        />
      </InteractivedProvider>
    </Suspense>
  );
}
