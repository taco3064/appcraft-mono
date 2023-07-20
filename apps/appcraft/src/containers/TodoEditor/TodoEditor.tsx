import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedTodoEditor, Style } from '@appcraft/mui';
import { useState } from 'react';

import * as Hook from '~appcraft/hooks';
import { Breadcrumbs, PersistentDrawerContent } from '~appcraft/components';
import { CommonButton } from '~appcraft/components/common';
import { Parser, getTypeDefinition } from '~appcraft/services';
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
  const [todos, handleTodos] = Hook.useTodoValues({ data, onSave });

  const width = Hook.useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        expand: !isCollapsable ? null : (
          <CommonButton
            btnVariant="icon"
            icon={open ? <AutoFixOffIcon /> : <AutoFixHighIcon />}
            text={tt(`btn-expand-${isSettingOpen ? 'off' : 'on'}`)}
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
    [open, todos, isCollapsable, isSettingOpen]
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
        open={isSettingOpen}
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
        drawer={<div>Drawer</div>}
      />
    </>
  );
}
