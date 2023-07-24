import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import Head from 'next/head';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Style } from '@appcraft/mui';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { CommonButton } from '~appcraft/components/common';
import { HierarchyList, WidgetPreview } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';

const HIERARCHY_LIST_ACTIONS = ['search', 'addGroup', 'addItem'];

export default function Widgets() {
  const { pathname } = useRouter();
  const [at, nt, wt] = useFixedT('app', 'nav', 'widgets');
  const [preview, setPreview] = useState<{ id: string; name: string }>();

  const [action, handleActionNodePick] = useNodePickHandle(
    HIERARCHY_LIST_ACTIONS
  );

  return (
    <>
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

      <Style.FlexDialog
        fullWidth
        maxWidth="sm"
        title={wt('ttl-preview', { name: preview?.name })}
        open={Boolean(preview?.id)}
        onClose={() => setPreview(undefined)}
      >
        {preview && <WidgetPreview id={preview.id} />}
      </Style.FlexDialog>
    </>
  );
}
