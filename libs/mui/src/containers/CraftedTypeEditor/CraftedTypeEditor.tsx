import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';

import * as Comp from '../../components';
import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { EditorProvider, OptionValues, useStateContext } from '../../contexts';
import type * as Types from './CraftedTypeEditor.types';

export default function CraftedTypeEditor<V extends OptionValues>({
  HeaderProps,
  exclude,
  fixedT,
  fullHeight,
  open = true,
  values,
  overrideNamingProps,
  renderOverrideItem,
  onChange,
  onFetchDefinition,
}: Types.CraftedTypeEditorProps<V>) {
  const ct = Hook.useFixedT(fixedT);
  const { toggle } = useStateContext();
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
      {...{
        fixedT,
        collectionPath,
        values,
        overrideNamingProps,
        renderOverrideItem,
        onChange,
      }}
    >
      <Style.FullHeightCollapse
        aria-label="Properties Editor"
        fullHeight={fullHeight}
        in={open}
      >
        {HeaderProps && (
          <Style.WidgetAppBar
            action={toggle}
            sx={HeaderProps.sx}
            BackButtonProps={{
              icon: <ArrowBackIcon />,
              text: ct('btn-back'),
              onClick: () => {
                HeaderProps.onBack();
                setCollectionPath('');
              },
            }}
          >
            <Style.AutoBreakTypography
              primary={HeaderProps.primary}
              secondary={HeaderProps.secondary}
            />
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
