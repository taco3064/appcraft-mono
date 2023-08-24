import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import StorageIcon from '@mui/icons-material/Storage';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/router';

import { CommonButton } from '~appcraft/components';
import {
  HierarchyList,
  StateViewer,
  WidgetPreview,
} from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';

const HIERARCHY_LIST_ACTIONS = ['search', 'addGroup', 'addItem'];

export default function Widgets() {
  const { pathname } = useRouter();
  const [at, nt, wt] = useFixedT('app', 'nav', 'widgets');

  const [detail, setDetail] = useState<{
    type: 'preview' | 'state';
    id: string;
    name: string;
  }>();

  const [action, handleActionNodePick] = useNodePickHandle(
    HIERARCHY_LIST_ACTIONS
  );

  return (
    <>
      <PageContainer
        ContentProps={{ disableGutters: true }}
        maxWidth="lg"
        primary={nt('ttl-widgets')}
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
            <>
              <CommonButton
                btnVariant="icon"
                color="default"
                icon={<StorageIcon />}
                text={wt('btn-state')}
                onClick={() => setDetail({ type: 'state', id: _id, name })}
              />

              <CommonButton
                btnVariant="icon"
                color="default"
                icon={<VisibilityOutlinedIcon />}
                text={at('btn-preview')}
                onClick={() => setDetail({ type: 'preview', id: _id, name })}
              />
            </>
          )}
        />
      </PageContainer>

      <CraftsmanStyle.FlexDialog
        fullWidth
        maxWidth="sm"
        title={{ primary: wt(`ttl-${detail?.type}`), secondary: detail?.name }}
        open={Boolean(detail?.id)}
        onClose={() => setDetail(undefined)}
      >
        <Suspense fallback={<LinearProgress />}>
          {detail?.type === 'preview' && <WidgetPreview id={detail.id} />}
          {detail?.type === 'state' && <StateViewer id={detail.id} />}
        </Suspense>
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
