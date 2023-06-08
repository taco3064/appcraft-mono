import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Suspense, lazy, useMemo, useState } from 'react';

import { EditorProvider, useFixedT } from '../../contexts';
import { TypeList } from '../TypeList';
import { TypeListSkeleton } from '../TypeListSkeleton';
import type { CraftedTypeEditorProps } from './CraftedTypeEditor.types';

export default function CraftedTypeEditor({
  action,
  disableSelection,
  fixedT,
  mixedTypes,
  parser,
  typeFile,
  typeName,
  values,
  onChange,
  onMixedTypeMapping,
}: CraftedTypeEditorProps) {
  const ct = useFixedT(fixedT);
  const [collectionPath, setCollectionPath] = useState('');

  const LazyTypeList = useMemo(
    () =>
      lazy(async () => {
        const isValid = Boolean(typeFile && typeName);

        const { data } = !isValid
          ? { data: null }
          : await axios({
              ...parser,
              data: {
                typeFile,
                typeName,
                propPath: collectionPath,
                mixedTypes,
              },
            });

        return {
          default: ({ invalidMessage, ...props }) =>
            !data ? (
              <Typography
                variant="h6"
                color="text.secondary"
                justifyContent="center"
                lineHeight={3}
              >
                {invalidMessage}
              </Typography>
            ) : (
              <TypeList {...props} superior={data} />
            ),
        };
      }),
    [parser, typeFile, typeName, collectionPath, mixedTypes]
  );

  return (
    <EditorProvider
      {...{
        fixedT,
        mixedTypes,
        collectionPath,
        values,
        onChange,
        onMixedTypeMapping,
      }}
    >
      {action}

      <Suspense fallback={<TypeListSkeleton />}>
        <LazyTypeList
          {...{
            disableSelection,
            mixedTypes,
            values,
            onChange,
            onMixedTypeMapping,
          }}
          invalidMessage={ct('msg-select-widget-type-first')}
          onCollectionPathChange={setCollectionPath}
        />
      </Suspense>
    </EditorProvider>
  );
}
