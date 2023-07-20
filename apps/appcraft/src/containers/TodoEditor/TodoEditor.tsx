import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedTodoEditor, Style } from '@appcraft/mui';
import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';

import * as Hook from '~appcraft/hooks';
import { Breadcrumbs, PersistentDrawerContent } from '~appcraft/components';
import { CommonButton } from '~appcraft/components/common';
import { Parser, getTypeDefinition } from '~appcraft/services';
import { TodoStepper } from '../TodoStepper';
import type { TodoEditorProps } from './TodoEditor.types';

export default function TodoEditor({
  PersistentDrawerContentProps,
  data,
  superiors: { names, breadcrumbs },
  onActionNodePick = (e) => e,
  onSave,
}: TodoEditorProps) {
  const [at, ct, tt] = Hook.useFixedT('app', 'appcraft', 'todos');
  const [open, setOpen] = useState(true);

  const [{ duration, logs, todos }, handleTodos] = Hook.useTodoValues({
    data,
    onSave,
    onOpen: () => setOpen(true),
  });

  const width = Hook.useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width) && logs.length > 0;
  const isLogsOpen = (!isCollapsable || open) && logs.length > 0;
  const refresh = useMemo(() => nanoid(4), [logs]);

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        expand:
          !isCollapsable || open ? null : (
            <CommonButton
              btnVariant="icon"
              icon={<AccountTreeOutlinedIcon />}
              text={tt('btn-logs')}
              onClick={() => setOpen(!open)}
            />
          ),
        run: (
          <CommonButton
            btnVariant="icon"
            icon={
              <Style.CompositeIcon
                primary={AssignmentOutlinedIcon}
                secondary={PlayCircleIcon}
              />
            }
            text={tt('btn-run')}
            onClick={handleTodos.run}
          />
        ),
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={<RestartAltIcon />}
            text={at('btn-reset')}
            onClick={handleTodos.reset}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={<SaveAltIcon />}
            text={at('btn-save')}
            onClick={handleTodos.save}
          />
        ),
      }),
    [open, todos, isCollapsable]
  );

  return (
    <>
      <Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        action={actionNode}
        onCustomize={([index]) => [
          index,
          ...breadcrumbs,
          { text: names[data._id] },
        ]}
      />

      <PersistentDrawerContent
        {...PersistentDrawerContentProps}
        ContentProps={{ style: { alignItems: 'center' } }}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        open={isLogsOpen}
        content={
          <CraftedTodoEditor
            fullHeight
            disableCategories={['wrap', 'state']}
            fixedT={ct}
            typeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
            values={todos}
            onChange={handleTodos.change}
            onFetchDefinition={(...e) => getTypeDefinition(Parser.Config, ...e)}
          />
        }
        drawer={
          <TodoStepper
            {...{ duration, logs, todos }}
            key={refresh}
            title={
              <>
                {isCollapsable && (
                  <CommonButton
                    btnVariant="icon"
                    icon={<ChevronRightIcon />}
                    text={at('btn-close')}
                    onClick={() => setOpen(false)}
                  />
                )}

                <Style.GapTypography
                  variant="subtitle1"
                  fontWeight="bolder"
                  color="primary"
                >
                  {tt('ttl-logs')}
                </Style.GapTypography>
              </>
            }
          />
        }
      />
    </>
  );
}
