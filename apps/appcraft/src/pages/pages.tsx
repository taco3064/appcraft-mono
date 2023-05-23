import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';

import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';

const category = 'pages';

export default function Pages() {
  const [nt] = useFixedT('nav');

  const [action, handleActionNodePick] = useNodePickHandle([
    'search',
    'addGroup',
    'addItem',
  ]);

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-pages')}
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
        icon={DashboardRoundedIcon}
        onActionNodePick={handleActionNodePick}
      />
    </PageContainer>
  );
}
