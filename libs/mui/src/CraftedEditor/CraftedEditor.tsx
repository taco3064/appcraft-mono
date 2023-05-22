import { Suspense, useState } from 'react';

import { InteractivedProvider } from '../InteractivedContext';
import { TypeListSkeleton } from '../TypeListSkeleton';
import { useLazyTypeList } from './CraftedEditor.hooks';
import type { CraftedEditorProps } from './CraftedEditor.types';

export default function CraftedEditor({
  disableSelection,
  parser,
  typeFile,
  typeName,
  mixedTypes,
  values,
  onChange,
  onMixedTypeMapping,
}: CraftedEditorProps) {
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
