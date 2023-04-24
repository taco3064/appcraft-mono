import Head from 'next/head';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { HierarchyList, HierarchyListAction } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';

export default function Themes() {
  const { pathname } = useRouter();
  const [nt] = useFixedT('nav');
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
        icon={PaletteRoundedIcon}
        onActionNodePick={({ addItem, search, ...nodes }) => {
          setAction({ addItem, search });

          return nodes;
        }}
      />
    </PageContainer>
  );
}
