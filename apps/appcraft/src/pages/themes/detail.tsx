import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { PaletteOptions } from '@mui/material/styles';

import { CommonButton } from '~appcraft/components/common';
import { ConfigDetail, ConfigDetailAction } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
import { useFixedT, useSettingModified, useSuperiors } from '~appcraft/hooks';

export default function Detail() {
  const { setTheme } = useSettingModified();
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [at, tt] = useFixedT('app', 'themes');
  const [action, setAction] = useState<Partial<ConfigDetailAction>>(null);
  const [{ data: names }, superiors] = useSuperiors(category, id);

  const { data: theme, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<PaletteOptions>,
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={tt('ttl-detail', { name: names[id] })}
      action={
        <>
          {theme && (
            <CommonButton
              btnVariant="icon"
              icon={AutoAwesomeOutlinedIcon}
              text={at('btn-apply')}
              onClick={() => setTheme(theme._id, theme.timestamp)}
            />
          )}

          {action?.reset}
          {action?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {tt('ttl-detail', { name: names[id] })}</title>
      </Head>

      <ConfigDetail
        key={id}
        typeName="PaletteOptions"
        typeFile="./node_modules/@mui/material/styles/index.d.ts"
        category={category}
        data={theme}
        superiors={{ names, paths: superiors }}
        onSave={refetch}
        onActionNodePick={({ reset, save, ...nodes }) => {
          setAction({ reset, save });

          return nodes;
        }}
      />
    </PageContainer>
  );
}
