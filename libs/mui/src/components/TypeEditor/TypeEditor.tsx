import axios from 'axios';
import { Suspense, lazy, useMemo, useState } from 'react';

import { EditorProvider } from '../../contexts';
import { TypeList } from '../TypeList';
import { TypeListSkeleton } from '../TypeListSkeleton';
import type { TypeEditorProps } from './TypeEditor.types';

export default function TypeEditor({
  disableSelection,
  parser,
  typeFile,
  typeName,
  mixedTypes,
  values,
  fixedT,
  onChange,
  onMixedTypeMapping,
}: TypeEditorProps) {
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
    <EditorProvider
      {...{
        fixedT,
        propPath,
        mixedTypes,
        values,
        onChange,
        onMixedTypeMapping,
      }}
    >
      <Suspense fallback={<TypeListSkeleton />}>
        <LazyTypeList
          {...{ disableSelection, values }}
          onPropPathChange={setPropPath}
        />
      </Suspense>
    </EditorProvider>
  );
}
