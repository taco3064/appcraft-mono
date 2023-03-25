import LinearProgress from '@mui/material/LinearProgress';
import { ReactNode, Suspense, useState } from 'react';

import type { HierarchyListActionName } from '~appcraft/components';
import { HierarchyList } from '~appcraft/components';
import { PageContainer } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';

const category = 'datasources';

export default function DataSources() {
  const [nt] = useFixedT('nav');

  const [action, setAction] =
    useState<Record<HierarchyListActionName, ReactNode>>(null);

  return (
    <Suspense fallback={<LinearProgress />}>
      <PageContainer
        ContentProps={{ disableGutters: true }}
        maxWidth="lg"
        title={nt('ttl-datasources')}
        action={action?.addGroup}
      >
        <HierarchyList
          category={category}
          onActionNodeSplit={async (name, node) => {
            if (name === 'addGroup') {
              setAction({ ...action, [name]: node });

              return null;
            }

            return node;
          }}
        />
      </PageContainer>
    </Suspense>
  );
}
