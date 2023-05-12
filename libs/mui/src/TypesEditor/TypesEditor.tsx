import { Suspense, useState } from 'react';

import { FilterDialog } from '../FilterDialog';
import { InteractivedProvider } from '../InteractivedContext';
import { TypeListSkeleton } from '../TypeListSkeleton';
import { useLazyTypeList } from './TypesEditor.hooks';
import type * as Types from './TypesEditor.types';

export default function TypesEditor({
  ActionButtonProps,
  disableSelection,
  parser,
  typeFile,
  typeName,
  mixedTypes,
  values,
  onActionNodePick,
  onChange,
  onMixedTypeMapping,
}: Types.TypesEditorProps) {
  const [filtering, setFiltering] = useState(false);
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
          {...{ ActionButtonProps, disableSelection, values, onActionNodePick }}
          onFilterToggle={() => setFiltering(true)}
          onPropPathChange={setPropPath}
        />
      </InteractivedProvider>

      <FilterDialog
        open={filtering}
        onClose={() => setFiltering(false)}
        onConfirm={(newFilters) => console.log(newFilters)}
        onReset={() => console.log('reset')}
      />
    </Suspense>
  );
}
