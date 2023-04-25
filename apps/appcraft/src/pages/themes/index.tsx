import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Head from 'next/head';
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { CommonButton } from '~appcraft/components/common';
import { HierarchyList, HierarchyListAction } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useSettingModified } from '~appcraft/hooks';

export default function Themes() {
  const { pathname } = useRouter();
  const { setTheme } = useSettingModified();
  const [at, nt] = useFixedT('app', 'nav');
  const [action, setAction] = useState<Partial<HierarchyListAction>>(null);

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-themes')}
      action={
        <>
          {action?.search}
          {action?.addItem}
        </>
      }
    >
      <Head>
        <title>Appcraft | {nt('ttl-themes')}</title>
      </Head>

      <HierarchyList
        disableGroup
        category={pathname.replace(/^\//, '')}
        icon={PaletteTwoToneIcon}
        onActionNodePick={({ addItem, search, ...nodes }) => {
          setAction({ addItem, search });

          return nodes;
        }}
        onItemActionRender={(theme) => (
          <CommonButton
            btnVariant="icon"
            color="default"
            icon={AutoAwesomeIcon}
            text={at('btn-apply')}
            onClick={() => setTheme(theme._id)}
          />
        )}
      />
    </PageContainer>
  );
}
