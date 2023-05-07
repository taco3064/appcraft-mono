import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import Head from 'next/head';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { CommonButton } from '~appcraft/components/common';
import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';
import type { HierarchyListAction } from '~appcraft/containers';

export default function Widgets() {
  const { pathname } = useRouter();
  const [at, nt] = useFixedT('app', 'nav');
  const [action, setAction] = useState<Partial<HierarchyListAction>>(null);

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
        onActionNodePick={({ addGroup, addItem, search, ...nodes }) => {
          setAction({ addGroup, addItem, search });

          return nodes;
        }}
        onItemActionRender={(theme) => (
          <CommonButton
            btnVariant="icon"
            color="default"
            icon={VisibilityOutlinedIcon}
            text={at('btn-preview')}
            onClick={() => console.log(theme._id)}
          />
        )}
      />
    </PageContainer>
  );
}
