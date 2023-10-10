import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import Head from 'next/head';
import StorageIcon from '@mui/icons-material/Storage';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { MainWidget } from '@appcraft/types';
import type { ReactElement } from 'react';

import { CommonButton, StateViewer, WidgetPreview } from '~appcraft/components';
import { AdminLayout, HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { findConfig } from '~appcraft/services';
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

  const { data: widget } = useQuery({
    enabled: Boolean(detail?.id),
    queryKey: [detail?.id],
    queryFn: findConfig<MainWidget>,
    refetchOnWindowFocus: false,
  });

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
        maxWidth={detail?.type === 'state' ? 'xs' : 'sm'}
        title={{ primary: wt(`ttl-${detail?.type}`), secondary: detail?.name }}
        open={Boolean(detail)}
        onClose={() => setDetail(undefined)}
      >
        {widget?.content && (
          <>
            {detail?.type === 'state' && (
              <StateViewer widget={widget.content} />
            )}

            {detail?.type === 'preview' && (
              <WidgetPreview widget={widget.content} />
            )}
          </>
        )}
      </CraftsmanStyle.FlexDialog>
    </>
  );
}

Widgets.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;
