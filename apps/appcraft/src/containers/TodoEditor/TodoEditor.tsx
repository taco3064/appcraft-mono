import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedTodoEditor, CraftsmanStyle } from '@appcraft/craftsman';
import { useEffect, useState } from 'react';
import { useWidth } from '@appcraft/exhibitor';

import * as Hook from '~appcraft/hooks';
import Breadcrumbs from '../Breadcrumbs';
import { ResponsiveDrawer } from '~appcraft/styles';
import { CommonButton, TodoOutputStepper } from '~appcraft/components';
import { getTypeDefinition } from '~appcraft/services';
import { useCraftsmanOverride } from '~appcraft/contexts';
import type { TodoEditorProps } from './TodoEditor.types';

export default function TodoEditor({
  ResponsiveDrawerProps,
  data,
  logZIndex,
  superiors,
  onActionNodePick = (e) => e,
  onSave,
}: TodoEditorProps) {
  const [at, tt] = Hook.useFixedT('app', 'todos');
  const [open, setOpen] = useState(true);
  const handleFetch = Hook.useCraftsmanFetch();

  const [{ duration, outputs, todos }, handleTodos] = Hook.useTodoValues({
    data,
    onSave,
    onOpen: () => setOpen(true),
  });

  const width = useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width) && outputs.length > 0;
  const isLogsOpen = (!isCollapsable || open) && outputs.length > 0;
  const override = useCraftsmanOverride({});

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        run: (
          <CommonButton
            btnVariant="icon"
            icon={
              <CraftsmanStyle.CompositeIcon
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

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [isLogsOpen]);

  return (
    <>
      {superiors && (
        <Breadcrumbs
          ToolbarProps={{ disableGutters: true }}
          action={actionNode}
          onCustomize={([index]) => [
            index,
            ...superiors.breadcrumbs,
            { text: superiors.names[data._id] },
          ]}
        />
      )}

      <ResponsiveDrawer
        {...ResponsiveDrawerProps}
        ContentProps={{ style: { alignItems: 'center' } }}
        DrawerProps={{
          maxWidth: 'xs',
          sx: { zIndex: logZIndex },
        }}
        open={isLogsOpen}
        onClose={() => setOpen(false)}
        content={
          <CraftedTodoEditor
            {...override}
            fullHeight
            disableCategories={['wrap', 'state', 'props', 'search']}
            typeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
            values={todos}
            onChange={handleTodos.change}
            onFetchData={handleFetch.data}
            onFetchDefinition={getTypeDefinition}
            onFetchWrapper={handleFetch.wrapper}
          />
        }
        drawer={
          <TodoOutputStepper
            {...{ duration, outputs, todos }}
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

                <CraftsmanStyle.GapTypography
                  variant="subtitle1"
                  fontWeight="bolder"
                  color="primary"
                >
                  {tt('ttl-output')}
                </CraftsmanStyle.GapTypography>
              </>
            }
          />
        }
      />
    </>
  );
}
