import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';
import type { StructureProp } from '@appcraft/types';

import * as Comp from '../../components';
import * as Ctx from '../../contexts';
import * as Hook from '../../hooks';
import * as Style from '../../styles';
import type * as Types from './CraftedTypeEditor.types';

export default function CraftedTypeEditor<V extends Ctx.OptionValues>({
  HeaderProps,
  exclude,
  fullHeight,
  values,
  overrideMixedOptions,
  overrideNamingProps,
  renderOverrideItem,
  onChange,
  onFetchDefinition,
}: Types.CraftedTypeEditorProps<V>) {
  const action = Ctx.useSelectionAction();
  const ct = Ctx.useLocalesContext();
  const [collectionPath, setCollectionPath] = useState('');

  const LazyTypeList = Hook.useLazyDefinition<
    Types.LazyTypeListProps<V>,
    StructureProp
  >(
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
    <Ctx.EditorProvider
      {...{
        collectionPath,
        values,
        overrideMixedOptions,
        overrideNamingProps,
        renderOverrideItem,
        onChange,
      }}
    >
      <Style.FlexContainer disableGutters fullHeight={fullHeight}>
        {HeaderProps && (
          <Style.WidgetAppBar
            action={action}
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
              primaryTypographyProps={{
                whiteSpace: 'nowrap',
              }}
              secondaryTypographyProps={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
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
      </Style.FlexContainer>
    </Ctx.EditorProvider>
  );
}
