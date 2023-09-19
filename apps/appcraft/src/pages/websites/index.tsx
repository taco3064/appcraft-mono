import Head from 'next/head';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import { useRouter } from 'next/router';

import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks/common';

const HIERARCHY_LIST_ACTIONS = ['search', 'addItem'];

export default function Websites() {
  const { pathname } = useRouter();
  const [nt] = useFixedT('nav');

  const [action, handleActionNodePick] = useNodePickHandle(
    HIERARCHY_LIST_ACTIONS
  );

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      primary={nt('ttl-websites')}
      action={
        <>
          {action?.search}
          {action?.addItem}
        </>
      }
    >
      <Head>
        <title>Appcraft | {nt('ttl-websites')}</title>
      </Head>

      <HierarchyList
        disableGroup
        category={pathname.replace(/^\//, '')}
        icon={LanguageTwoToneIcon}
        onActionNodePick={handleActionNodePick}
      />
    </PageContainer>
  );
}
