import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import Head from 'next/head';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRouter } from 'next/router';

import { CommonButton } from '~appcraft/components/common';
import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';

export default function Widgets() {
  const { pathname } = useRouter();
  const [at, nt] = useFixedT('app', 'nav');

  const [action, handleActionNodePick] = useNodePickHandle([
    'search',
    'addGroup',
    'addItem',
  ]);

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-widgets')}
      action={
        <>
          {action?.search}
          {action?.addGroup}
          {action?.addItem}
        </>
      }
    >
      <Head>
        <title>Appcraft | {nt('ttl-widgets')}</title>
      </Head>

      <HierarchyList
        category={pathname.replace(/^\//, '')}
        icon={ExtensionTwoToneIcon}
        onActionNodePick={handleActionNodePick}
        onItemActionRender={(theme) => (
          <CommonButton
            btnVariant="icon"
            color="default"
            icon={VisibilityOutlinedIcon}
            text={at('btn-preview')}
            onClick={() => console.log(theme._id)} //! 待實作 preview 功能
          />
        )}
      />
    </PageContainer>
  );
}
