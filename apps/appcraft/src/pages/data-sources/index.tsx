import Head from 'next/head';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { useRouter } from 'next/router';

import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';

export default function DataSources() {
  const { pathname } = useRouter();
  const [nt] = useFixedT('nav');

  const [action, handleActionNodePick] = useNodePickHandle([
    'search',
    'addGroup',
    'addItem',
  ]);

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
        onActionNodePick={handleActionNodePick}
      />
    </PageContainer>
  );
}
