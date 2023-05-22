import { Suspense, useState } from 'react';

import { EditorProvider } from '../EditorContext';
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
      <EditorProvider
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
      </EditorProvider>
    </Suspense>
  );
}
