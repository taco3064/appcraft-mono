import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';

import * as Comp from '../../components';
import * as Hooks from '../../hooks';
import { EditorProvider, OptionValues } from '../../contexts';
import type * as Types from './CraftedTypeEditor.types';

export default function CraftedTypeEditor<V extends OptionValues>({
  fixedT,
  open = true,
  parser,
  values,
  onBack,
  onChange,
}: Types.CraftedTypeEditorProps<V>) {
  const ct = Hooks.useFixedT(fixedT);
  const [collectionPath, setCollectionPath] = useState('');

  const LazyTypeList = Hooks.useLazyTypeList<Types.LazyTypeListProps<V>>(
    parser,
    { ...(values as V), collectionPath },
    ({ fetchData, placeholder, ...props }) =>
      fetchData ? (
        <Comp.TypeList {...props} collection={fetchData} />
      ) : (
        <Typography
          variant="h6"
          color="text.secondary"
          justifyContent="center"
          lineHeight={3}
        >
          {placeholder}
        </Typography>
      )
  );

  return (
    <EditorProvider {...{ fixedT, collectionPath, values, onChange }}>
      <Collapse in={open}>
        {values?.category === 'node' && onBack && (
          <Comp.WidgetAppBar
            type="props"
            ct={ct}
            description={values.type.replace(/([A-Z])/g, ' $1')}
            onBackToStructure={onBack}
          />
        )}

        <Suspense fallback={<Comp.TypeListSkeleton />}>
          <LazyTypeList
            placeholder={ct('msg-select-widget-type-first')}
            values={values as V}
            onChange={onChange}
            onCollectionPathChange={setCollectionPath}
          />
        </Suspense>
      </Collapse>
    </EditorProvider>
  );
}
