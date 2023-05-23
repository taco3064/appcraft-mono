import axios from 'axios';
import { Suspense, lazy, useMemo, useState } from 'react';

import { EditorProvider } from '../../contexts';
import { TypeList } from '../TypeList';
import { TypeListSkeleton } from '../TypeListSkeleton';
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

  const LazyTypeList = useMemo(
    () =>
      lazy(async () => {
        const { data } = await axios({
          ...parser,
          data: {
            typeFile,
            typeName,
            propPath,
            mixedTypes,
          },
        });

        return {
          default: (props) => <TypeList {...props} superior={data} />,
        };
      }),
    [parser, typeFile, typeName, propPath, mixedTypes]
  );

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
