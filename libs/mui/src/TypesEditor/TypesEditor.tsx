import { Suspense, useState } from 'react';
import type { FilterOptions } from '@appcraft/types';

import { FilterDialog } from '../FilterDialog';
import { InteractivedProvider } from '../InteractivedContext';
import { TypeListSkeleton } from '../TypeListSkeleton';
import { useLazyTypeList } from './TypesEditor.hooks';
import type * as Types from './TypesEditor.types';

const defaultFilters = () =>
  ({
    types: [],
    names: [
      '^onChange$',
      '^onClick$',
      '^onClose$',
      '^onDoubleClick$',
      '^onSubmit$',
      '^(?!(aria-|on[A-Z]|key$|classes$|className$|contentEditable$|ref$|role$|id$|dangerouslySetInnerHTML$)).*',
    ],
  } as FilterOptions);

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
  const [filters, setFilters] = useState(defaultFilters);
  const [propPath, setPropPath] = useState('');

  const LazyTypeList = useLazyTypeList({
    parser,
    propPath,
    typeFile,
    typeName,
    mixedTypes,
    filters,
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
        values={filters}
        onClose={() => setFiltering(false)}
        onConfirm={setFilters}
        onReset={() => setFilters(defaultFilters)}
      />
    </Suspense>
  );
}
