import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import Head from 'next/head';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Style } from '@appcraft/mui';
import { useRouter } from 'next/router';

import { CommonButton } from '~appcraft/components/common';
import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';

export default function Todos() {
  const { pathname } = useRouter();
  const [nt, tt] = useFixedT('nav', 'todos');

  const [action, handleActionNodePick] = useNodePickHandle([
    'search',
    'addGroup',
    'addItem',
  ]);

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      title={nt('ttl-todos')}
      action={
        <>
          {action?.search}
          {action?.addGroup}
          {action?.addItem}
        </>
      }
    >
      <Head>
        <title>Appcraft | {nt('ttl-todos')}</title>
      </Head>

      <HierarchyList
        category={pathname.replace(/^\//, '')}
        icon={AssignmentRoundedIcon}
        onActionNodePick={handleActionNodePick}
        onItemActionRender={(data) => (
          <CommonButton
            btnVariant="icon"
            icon={
              <Style.CompositeIcon
                primary={AssignmentOutlinedIcon}
                secondary={PlayCircleIcon}
              />
            }
            text={tt('btn-run')}
            onClick={() => console.log('test')}
          />
        )}
      />
    </PageContainer>
  );
}
