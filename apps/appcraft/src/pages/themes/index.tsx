import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Head from 'next/head';
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import { useRouter } from 'next/router';

import * as Hook from '~appcraft/hooks';
import { ArtisanLayout, HierarchyList } from '~appcraft/containers';
import { CommonButton } from '~appcraft/components';
import { PageContainer } from '~appcraft/styles';
import { withPerPageLayout } from '~appcraft/hocs';

const HIERARCHY_LIST_ACTIONS = ['search', 'addItem'];

export default withPerPageLayout(ArtisanLayout, function Themes() {
  const { pathname } = useRouter();
  const [, handleSetting] = Hook.useSettingModified();
  const [at, nt] = Hook.useFixedT('app', 'nav');

  const [action, handleActionNodePick] = Hook.useNodePickHandle(
    HIERARCHY_LIST_ACTIONS
  );

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      primary={nt('ttl-themes')}
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
            icon={<AutoAwesomeOutlinedIcon />}
            text={at('btn-apply')}
            onClick={() => handleSetting.theme(theme._id)}
          />
        )}
      />
    </PageContainer>
  );
});
