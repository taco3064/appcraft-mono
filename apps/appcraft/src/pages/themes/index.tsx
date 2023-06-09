import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Head from 'next/head';
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import { useRouter } from 'next/router';

import * as Hooks from '~appcraft/hooks';
import { CommonButton } from '~appcraft/components/common';
import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';

export default function Themes() {
  const { pathname } = useRouter();
  const { setTheme } = Hooks.useSettingModified();
  const [at, nt] = Hooks.useFixedT('app', 'nav');

  const [action, handleActionNodePick] = Hooks.useNodePickHandle([
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
