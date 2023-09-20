import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import Head from 'next/head';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { CommonButton } from '~appcraft/components';
import { HierarchyList, PagePreview } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';

const HIERARCHY_LIST_ACTIONS = ['search', 'addGroup', 'addItem'];

export default function Pages() {
  const { pathname } = useRouter();
  const [at, nt, pt] = useFixedT('app', 'nav', 'pages');
  const [preview, setPreview] = useState<{ id: string; name: string }>();

  const [action, handleActionNodePick] = useNodePickHandle(
    HIERARCHY_LIST_ACTIONS
  );

  return (
    <>
      <PageContainer
        ContentProps={{ disableGutters: true }}
        maxWidth="lg"
        primary={nt('ttl-pages')}
        action={
          <>
            {action?.search}
            {action?.addGroup}
            {action?.addItem}
          </>
        }
      >
        <Head>
          <title>Appcraft | {nt('ttl-pages')}</title>
        </Head>

        <HierarchyList
          category={pathname.replace(/^\//, '')}
          icon={DashboardTwoToneIcon}
          onActionNodePick={handleActionNodePick}
          onItemActionRender={({ _id, name }) => (
            <CommonButton
              btnVariant="icon"
              color="default"
              icon={<VisibilityOutlinedIcon />}
              text={at('btn-preview')}
              onClick={() => setPreview({ id: _id, name })}
            />
          )}
        />
      </PageContainer>

      <CraftsmanStyle.FlexDialog
        fullScreen
        fullWidth
        title={{ primary: pt('ttl-preview'), secondary: preview?.name }}
        open={Boolean(preview)}
        onClose={() => setPreview(undefined)}
      >
        {preview && <PagePreview id={preview.id} />}
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
