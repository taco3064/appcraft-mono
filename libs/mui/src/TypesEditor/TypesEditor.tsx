import { Suspense, useState } from 'react';

import { InteractivedProvider } from '../InteractivedContext';
import { TypeListSkeleton } from '../TypeListSkeleton';
import { useLazyTypeList } from './TypesEditor.hooks';
import type * as Types from './TypesEditor.types';

export default function TypesEditor({
  InputStyles,
  disableSelection,
  parser,
  typeFile,
  typeName,
  mixedTypes,
  values,
  onChange,
  onMixedTypeMapping,
}: Types.TypesEditorProps) {
  const [propPath, setPropPath] = useState<string>('');

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
          InputStyles,
          propPath,
          mixedTypes,
          values,
          onChange,
          onMixedTypeMapping,
        }}
      >
        <LazyTypeList
          disableSelection={disableSelection}
          values={values}
          onPropPathChange={setPropPath}
        />
      </InteractivedProvider>
    </Suspense>
  );
}
