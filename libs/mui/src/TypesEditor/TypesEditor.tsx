import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';

import { TypeItem } from '../TypeItem';
import { useLazyTypesDef } from './TypesEditor.hooks';
import type * as Types from './TypesEditor.types';

export default function TypesEditor({
  InputStyles,
  parser,
  tsconfigDir,
  typeFile,
  typeName,
}: Types.TypesEditorProps) {
  const [propPath, setPropPath] = useState<string>('');

  const [LazyList, typesDef] = useLazyTypesDef({
    parser,
    propPath,
    typeFile,
    typeName,
  });

  return (
    <Suspense fallback={<LinearProgress />}>
      <LazyList>
        {typesDef?.type === 'exact' &&
          Object.values(typesDef.options || {})
            .sort(({ type: t1, propName: p1 }, { type: t2, propName: p2 }) => {
              const s1 = `${t1}:${p1}`;
              const s2 = `${t2}:${p2}`;

              return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
            })
            .map((options) => (
              <TypeItem
                key={options.propName}
                {...{ InputStyles, options }}
                onDisplayItemClick={({ type }) => {
                  // setPropPath
                }}
              />
            ))}

        <Typography variant="caption" whiteSpace="pre-wrap">
          {JSON.stringify(typesDef, null, 2)}
        </Typography>
      </LazyList>
    </Suspense>
  );
}
