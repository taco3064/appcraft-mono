import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';

import * as Comp from '../../components';
import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { EditorProvider, OptionValues } from '../../contexts';
import type * as Types from './CraftedTypeEditor.types';

export default function CraftedTypeEditor<V extends OptionValues>({
  exclude,
  fixedT,
  fullHeight,
  open = true,
  values,
  renderOverridePureItem,
  onBack,
  onChange,
  onFetchDefinition,
}: Types.CraftedTypeEditorProps<V>) {
  const ct = Hook.useFixedT(fixedT);
  const [collectionPath, setCollectionPath] = useState('');

  const LazyTypeList = Hook.useLazyTypeList<Types.LazyTypeListProps<V>>(
    { ...(values as V), collectionPath },
    onFetchDefinition,
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
    <EditorProvider
      {...{ fixedT, collectionPath, values, renderOverridePureItem, onChange }}
    >
      <Style.FullHeightCollapse
        aria-label="Properties Editor"
        fullHeight={fullHeight}
        in={open}
      >
        {values?.category === 'node' && onBack && (
          <Style.WidgetAppBar
            BackButtonProps={{
              icon: <ArrowBackIcon />,
              text: ct('btn-back'),
              onClick: () => {
                onBack();
                setCollectionPath('');
              },
            }}
          >
            {ct('ttl-props')}

            <Divider flexItem orientation="vertical" />

            {values.type.replace(/([A-Z])/g, ' $1')}
          </Style.WidgetAppBar>
        )}

        <Suspense fallback={<Style.TypeListSkeleton />}>
          <LazyTypeList
            placeholder={ct('msg-select-widget-type-first')}
            exclude={exclude}
            values={values as V}
            onChange={onChange}
            onCollectionPathChange={setCollectionPath}
          />
        </Suspense>
      </Style.FullHeightCollapse>
    </EditorProvider>
  );
}
