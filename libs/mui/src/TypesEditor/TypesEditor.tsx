import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';

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

  const [LazyPaper, typesDef] = useLazyTypesDef({
    parser,
    propPath,
    typeFile,
    typeName,
  });

  return (
    <Suspense fallback={<LinearProgress />}>
      <LazyPaper elevation={0}>
        <Typography variant="caption" whiteSpace="pre-wrap">
          {JSON.stringify(typesDef, null, 2)}
        </Typography>
      </LazyPaper>
    </Suspense>
  );
}
