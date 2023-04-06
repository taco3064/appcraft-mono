import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import LinearProgress from '@mui/material/LinearProgress';
import { Suspense, useState } from 'react';

import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';
import type { HierarchyListAction } from '~appcraft/containers';

const category = 'widgets';

export default function Widgets() {
  const [nt] = useFixedT('nav');
  const [action, setAction] = useState<Partial<HierarchyListAction>>(null);

  return (
    <Suspense fallback={<LinearProgress />}>
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
        <HierarchyList
          category={category}
          icon={ExtensionRoundedIcon}
          onActionNodeSplit={({ addGroup, addItem, search, ...nodes }) => {
            setAction({ addGroup, addItem, search });

            return nodes;
          }}
        />
      </PageContainer>
    </Suspense>
  );
}
