import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Head from 'next/head';
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import { useNodePickHandle } from '@appcraft/mui';
import { useRouter } from 'next/router';

import { CommonButton } from '~appcraft/components/common';
import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useSettingModified } from '~appcraft/hooks';

export default function Themes() {
  const { pathname } = useRouter();
  const { setTheme } = useSettingModified();
  const [at, nt] = useFixedT('app', 'nav');

  const [action, handleActionNodePick] = useNodePickHandle([
    'search',
    'addItem',
  ]);

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
        onActionNodePick={handleActionNodePick}
        onItemActionRender={(theme) => (
          <CommonButton
            btnVariant="icon"
            color="default"
            icon={AutoAwesomeOutlinedIcon}
            text={at('btn-apply')}
            onClick={() => setTheme(theme._id)}
          />
        )}
      />
    </PageContainer>
  );
}
