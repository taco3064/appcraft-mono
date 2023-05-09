import Popover from '@mui/material/Popover';
import { Suspense, useState } from 'react';

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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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
          propPath,
          mixedTypes,
          values,
          onChange,
          onMixedTypeMapping,
        }}
      >
        <LazyTypeList
          {...{ ActionButtonProps, disableSelection, values, onActionNodePick }}
          onFilterToggle={setAnchorEl}
          onPropPathChange={setPropPath}
        />
      </InteractivedProvider>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setAnchorEl(null)}
      >
        TEST
      </Popover>
    </Suspense>
  );
}
