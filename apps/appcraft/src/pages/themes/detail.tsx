import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Avatar from '@mui/material/Avatar';
import Head from 'next/head';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { ConfigOptions } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { ArtisanLayout, ConfigDetail } from '~appcraft/containers';
import { CommonButton } from '~appcraft/components';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { withPerPageLayout } from '~appcraft/hocs';
import type { RenderOverrideConfigItemHandler } from '~appcraft/containers';

const CONFIG_DETAIL_ACTIONS = ['reset', 'save'];

export default withPerPageLayout(ArtisanLayout, function Detail() {
  const [at, tt] = Hook.useFixedT('app', 'themes');
  const [, handleSetting] = Hook.useSettingModified();
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [action, handleActionNodePick] = Hook.useNodePickHandle(
    CONFIG_DETAIL_ACTIONS
  );

  const { data: theme, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<ConfigOptions>,
    refetchOnWindowFocus: false,
  });

  const renderOverrideItem: RenderOverrideConfigItemHandler = (
    kind,
    { propPath, options, disabled, label, value, onChange }
  ) => {
    if (kind === 'pure' && options.type === 'string' && propPath !== 'mode') {
      return (
        <TextField
          {...{ disabled, label }}
          fullWidth
          size="small"
          variant="outlined"
          defaultValue={value}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: value || 'none',
                  }}
                >
                  &nbsp;
                </Avatar>
              </InputAdornment>
            ),
          }}
        />
      );
    }
  };

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      primary={tt('ttl-detail')}
      secondary={superiors[id]}
      action={
        <>
          {theme && (
            <CommonButton
              btnVariant="icon"
              icon={<AutoAwesomeOutlinedIcon />}
              text={at('btn-apply')}
              onClick={() => handleSetting.theme(theme._id, theme.timestamp)}
            />
          )}

          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {tt('ttl-detail')}</title>
      </Head>

      <ConfigDetail
        key={id}
        typeName="PaletteOptions"
        typeFile="./node_modules/@mui/material/styles/index.d.ts"
        data={theme}
        superiors={{ names: superiors, breadcrumbs }}
        renderOverrideItem={renderOverrideItem}
        onSave={refetch}
        onActionNodePick={handleActionNodePick}
      />
    </PageContainer>
  );
});
