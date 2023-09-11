import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Head from 'next/head';
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import { useRouter } from 'next/router';

import { CommonButton } from '~appcraft/components/common';
import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useSettingModified } from '~appcraft/hooks/common';
import { useNodePickHandle } from '~appcraft/hooks';

const HIERARCHY_LIST_ACTIONS = ['search', 'addItem'];

export default function Themes() {
  const { pathname } = useRouter();
  const [, handleSetting] = useSettingModified();
  const [at, nt] = useFixedT('app', 'nav');

  const [action, handleActionNodePick] = useNodePickHandle(
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
}
