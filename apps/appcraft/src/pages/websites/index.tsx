import Head from 'next/head';
import IconButton from '@mui/material/IconButton';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRouter } from 'next/router';

import { AdminLayout, HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';
import { findWebsiteById, removeWebsiteToken } from '~appcraft/services';
import { withPerPageLayout } from '~appcraft/hocs';

const HIERARCHY_LIST_ACTIONS = ['search', 'addItem'];

export default withPerPageLayout(AdminLayout, function Websites() {
  const { pathname, push } = useRouter();
  const [nt] = useFixedT('nav');

  const [action, handleActionNodePick] = useNodePickHandle(
    HIERARCHY_LIST_ACTIONS
  );

  return (
    <PageContainer
      ContentProps={{ disableGutters: true }}
      maxWidth="lg"
      primary={nt('ttl-websites')}
      action={
        <>
          {action?.search}
          {action?.addItem}
        </>
      }
    >
      <Head>
        <title>Appcraft | {nt('ttl-websites')}</title>
      </Head>

      <HierarchyList
        disableGroup
        category={pathname.replace(/^\//, '')}
        icon={LanguageTwoToneIcon}
        onActionNodePick={handleActionNodePick}
        onMutationSuccess={(type, { _id }) =>
          type === 'remove' && removeWebsiteToken(_id)
        }
        onItemActionRender={({ _id: websiteid }) => (
          <IconButton
            onClick={async () => {
              const { _id } = await findWebsiteById(websiteid);

              push({
                pathname: `/app/${_id}`,
                query: { websiteid },
              });
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        )}
      />
    </PageContainer>
  );
});
