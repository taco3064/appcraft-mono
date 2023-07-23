import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import Container from '@mui/material/Container';
import Head from 'next/head';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Style, getEventHandler } from '@appcraft/mui';
import { useRouter } from 'next/router';
import { ComponentProps, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import type { WidgetTodo } from '@appcraft/types';

import { CommonButton } from '~appcraft/components/common';
import { HierarchyList, TodoStepper } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { getConfigById } from '~appcraft/services';
import { useFixedT, useNodePickHandle } from '~appcraft/hooks';

const HIERARCHY_LIST_ACTIONS = ['search', 'addGroup', 'addItem'];

export default function Todos() {
  const { pathname } = useRouter();
  const [nt, tt] = useFixedT('nav', 'todos');

  const [steperProps, setStepperProps] =
    useState<ComponentProps<typeof TodoStepper>>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refresh = useMemo(() => nanoid(4), [steperProps]);

  const [action, handleActionNodePick] = useNodePickHandle(
    HIERARCHY_LIST_ACTIONS
  );

  return (
    <>
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
          icon={AssignmentTwoToneIcon}
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
              onClick={async () => {
                const { content: todos } = await getConfigById<
                  Record<string, WidgetTodo>
                >(data._id);

                const start = Date.now();
                const handleFn = getEventHandler(todos);
                const outputs = await handleFn();

                setStepperProps({
                  duration: Date.now() - start,
                  todos,
                  logs: outputs,
                });
              }}
            />
          )}
        />
      </PageContainer>

      <Style.FlexDialog
        fullWidth
        maxWidth="xs"
        open={Boolean(steperProps)}
        onClose={() => setStepperProps(undefined)}
      >
        <Container disableGutters>
          <TodoStepper {...steperProps} key={refresh} />
        </Container>
      </Style.FlexDialog>
    </>
  );
}
