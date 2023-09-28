import Divider from '@mui/material/Divider';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { Website } from '@appcraft/types';

import * as Hook from '~appcraft/hooks';
import { PageContainer } from '~appcraft/styles';
import { WebsiteEditor } from '~appcraft/containers';
import { findConfig } from '~appcraft/services';

const EDITOR_ADD_ACTIONS = ['add'];
const EDITOR_BASE_ACTIONS = ['switch', 'expand', 'reset', 'save'];

export default function Detail() {
  const [wt] = Hook.useFixedT('websites');
  const { pathname, query } = useRouter();

  const height = Hook.useHeight();
  const category = pathname.replace(/^\//, '').replace(/\/.+$/, '');
  const id = query.id as string;
  const { superiors, breadcrumbs } = Hook.useHierarchyFilter(category, id);

  const [actionAdd, handleActionAddPick] =
    Hook.useNodePickHandle(EDITOR_ADD_ACTIONS);

  const [actionBase, handleActionBasePick] =
    Hook.useNodePickHandle(EDITOR_BASE_ACTIONS);

  const { data: website, refetch } = useQuery({
    queryKey: [id],
    queryFn: findConfig<Website>,
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      primary={wt('ttl-detail')}
      secondary={superiors[id]}
      action={
        <>
          {actionBase?.switch}
          {actionBase?.expand}
          {actionAdd?.add}

          <Divider flexItem orientation="vertical" />

          {actionBase?.reset}
          {actionBase?.save}
        </>
      }
    >
      <Head>
        <title>Appcraft | {wt('ttl-detail')}</title>
      </Head>

      <WebsiteEditor
        data={website}
        superiors={{ names: superiors, breadcrumbs }}
        onActionAddPick={handleActionAddPick}
        onActionBasePick={handleActionBasePick}
        onSave={refetch}
      />
    </PageContainer>
  );
}
