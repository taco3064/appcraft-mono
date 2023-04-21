import Head from 'next/head';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';
import type { HierarchyListAction } from '~appcraft/containers';

export default function DataSources() {
  const { pathname } = useRouter();
  const [nt] = useFixedT('nav');
  const [action, setAction] = useState<Partial<HierarchyListAction>>(null);

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-data-sources')}
      action={
        <>
          {action?.search}
          {action?.addGroup}
          {action?.addItem}
        </>
      }
    >
      <Head>
        <title>Appcraft | {nt('ttl-data-sources')}</title>
      </Head>

      <HierarchyList
        category={pathname.replace(/^\//, '')}
        icon={StorageRoundedIcon}
        onActionNodeSplit={({ addGroup, addItem, search, ...nodes }) => {
          setAction({ addGroup, addItem, search });

          return nodes;
        }}
      />
    </PageContainer>
  );
}
