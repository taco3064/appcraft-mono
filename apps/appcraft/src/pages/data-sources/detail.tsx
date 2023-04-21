import Container from '@mui/material/Container';
import Head from 'next/head';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { TypesEditor } from '@appcraft/mui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { DataSource } from '@appcraft/types';

import { Breadcrumbs } from '~appcraft/containers';
import { CommonButton } from '~appcraft/components/common';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useSuperiors } from '~appcraft/hooks';

const parser = {
  url: '/api/ts2-props/types-resolve/parse',
  method: 'POST' as const,
};

export default function Detail() {
  const { pathname, query } = useRouter();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;

  const [at, dst] = useFixedT('app', 'data-sources');
  const [values, setValues] = useState<Partial<DataSource>>({});
  const [{ data: names }, superiors] = useSuperiors(category, id);

  console.log('<Detail /> - values: ', values);

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={dst('ttl-detail', { name: names[id] })}
      action={
        <>
          <CommonButton
            IconProps={{ fontSize: 'large' }}
            btnVariant="icon"
            color="error"
            icon={RestartAltIcon}
            text={at('btn-reset')}
          />

          <CommonButton
            IconProps={{ fontSize: 'large' }}
            btnVariant="icon"
            color="info"
            icon={SaveAltIcon}
            text={at('btn-save')}
          />
        </>
      }
    >
      <Head>
        <title>Appcraft | {dst('ttl-detail', { name: names[id] })}</title>
      </Head>

      <Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        onCustomize={(breadcrumbs) => {
          breadcrumbs.splice(
            1,
            1,
            ...superiors.map((superior, i) => ({
              text: names[superior],
              url: {
                pathname: `/${category}`,
                query: {
                  superiors: superiors.slice(0, i + 1),
                },
              },
            }))
          );

          return [...breadcrumbs, { text: names[id] }];
        }}
      />

      <Container maxWidth="sm">
        <TypesEditor
          InputStyles={{ size: 'small', variant: 'outlined' }}
          parser={parser}
          values={values}
          typeName="DataSource"
          typeFile="./app/node_modules/@appcraft/types/src/services/data-source.d.ts"
          onChange={setValues}
        />
      </Container>
    </PageContainer>
  );
}
