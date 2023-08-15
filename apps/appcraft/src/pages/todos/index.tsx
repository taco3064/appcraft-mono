import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import Container from '@mui/material/Container';
import Head from 'next/head';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import axios from 'axios';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useRouter } from 'next/router';
import { useState, useTransition } from 'react';
import type { OutputCollectEvent } from '@appcraft/exhibitor';
import type { WidgetTodo } from '@appcraft/types';

import { CommonButton, TodoOutputStepper } from '~appcraft/components';
import { HierarchyList } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { getConfigById } from '~appcraft/services';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';
import type { HierarchyData } from '~appcraft/services';

const HIERARCHY_LIST_ACTIONS = ['search', 'addGroup', 'addItem'];

export default function Todos() {
  const { pathname } = useRouter();
  const [nt, tt] = useFixedT('nav', 'todos');
  const [steperProps, setStepperProps] = useState<OutputCollectEvent>();
  const [, startTransition] = useTransition();

  const [action, handleActionNodePick] = useNodePickHandle(
    HIERARCHY_LIST_ACTIONS
  );

  const handleRun = (data: HierarchyData<string>) =>
    startTransition(() => {
      (async () => {
        const { content: todos } = await getConfigById<
          Record<string, WidgetTodo>
        >(data._id);

        const handleFn = ExhibitorUtil.getEventHandler(todos, {
          onOutputCollect: (e) => setStepperProps(e),
          onFetchData: async ({ url, method, headers, data }) => {
            const { data: result } = await axios({
              url,
              method,
              headers,
              ...(data && { data }),
            });

            return result;
          },
        });

        await handleFn();
      })();
    });

  return (
    <>
      <PageContainer
        ContentProps={{ disableGutters: true }}
        maxWidth="lg"
        primary={nt('ttl-todos')}
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
          icon={AssignmentTwoToneIcon}
          onActionNodePick={handleActionNodePick}
          onItemActionRender={(data) => (
            <CommonButton
              btnVariant="icon"
              text={tt('btn-run')}
              onClick={() => handleRun(data)}
              icon={
                <CraftsmanStyle.CompositeIcon
                  primary={AssignmentOutlinedIcon}
                  secondary={PlayCircleIcon}
                />
              }
            />
          )}
        />
      </PageContainer>

      <CraftsmanStyle.FlexDialog
        fullWidth
        maxWidth="xs"
        open={Boolean(steperProps)}
        onClose={() => setStepperProps(undefined)}
      >
        <Container disableGutters>
          <TodoOutputStepper {...steperProps} />
        </Container>
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
