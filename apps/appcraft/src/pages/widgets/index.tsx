import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import Head from 'next/head';
import LinearProgress from '@mui/material/LinearProgress';
import StorageIcon from '@mui/icons-material/Storage';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/router';

import * as Ctr from '~appcraft/containers';
import { CommonButton } from '~appcraft/components/common';
import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/contexts';
import { useNodePickHandle } from '~appcraft/hooks';

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

        <Ctr.HierarchyList
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
        maxWidth={detail?.type === 'state' ? 'xs' : 'sm'}
        title={{ primary: wt(`ttl-${detail?.type}`), secondary: detail?.name }}
        open={Boolean(detail?.id)}
        onClose={() => setDetail(undefined)}
      >
        <Suspense fallback={<LinearProgress />}>
          {detail?.type === 'preview' && <Ctr.WidgetPreview id={detail.id} />}
          {detail?.type === 'state' && <Ctr.StateViewer id={detail.id} />}
        </Suspense>
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
