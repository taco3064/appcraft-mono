import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Avatar from '@mui/material/Avatar';
import Head from 'next/head';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { ConfigOptions } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { CommonButton } from '~appcraft/components/common';
import { ConfigDetail } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';

const CONFIG_DETAIL_ACTIONS = ['reset', 'save'];

export default function Detail() {
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

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={tt('ttl-detail', { name: superiors[id] })}
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
        <title>Appcraft | {tt('ttl-detail', { name: superiors[id] })}</title>
      </Head>

      <ConfigDetail
        key={id}
        typeName="PaletteOptions"
        typeFile="./node_modules/@mui/material/styles/index.d.ts"
        data={theme}
        superiors={{ names: superiors, breadcrumbs }}
        onSave={refetch}
        onActionNodePick={handleActionNodePick}
        renderOverridePureItem={({
          propPath,
          options,
          disabled,
          label,
          value,
          onChange,
        }) => {
          if (options.type === 'string' && propPath !== 'mode') {
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
        }}
      />
    </PageContainer>
  );
}
