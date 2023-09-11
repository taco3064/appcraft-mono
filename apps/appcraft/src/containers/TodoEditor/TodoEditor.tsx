import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedTodoEditor, CraftsmanStyle } from '@appcraft/craftsman';
import { useEffect, useState } from 'react';

import { Breadcrumbs } from '../common';
import { CommonButton } from '~appcraft/components/common';
import { ResponsiveDrawer } from '~appcraft/styles';
import { TodoOutputStepper } from '~appcraft/components';
import { getTypeDefinition } from '~appcraft/services';
import { useCraftsmanOverrideContext } from '~appcraft/contexts';
import { useCraftsmanFetch, useFixedT } from '~appcraft/hooks/common';
import { useNodePicker, useTodoValues, useWidth } from '~appcraft/hooks';
import type { TodoEditorProps } from './TodoEditor.types';

export default function TodoEditor({
  ResponsiveDrawerProps,
  data,
  logZIndex,
  superiors,
  onActionNodePick = (e) => e,
  onSave,
}: TodoEditorProps) {
  const [at, tt] = useFixedT('app', 'todos');
  const [open, setOpen] = useState(true);
  const handleFetch = useCraftsmanFetch();

  const [{ duration, outputs, todos }, handleTodos] = useTodoValues({
    data,
    onSave,
    onOpen: () => setOpen(true),
  });

  const width = useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width) && outputs.length > 0;
  const isLogsOpen = (!isCollapsable || open) && outputs.length > 0;
  const override = useCraftsmanOverrideContext({});

  const actionNode = useNodePicker(
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
          anchor: 'right',
          maxWidth: 'xs',
          sx: { zIndex: logZIndex },
        }}
        open={isLogsOpen}
        onClose={() => setOpen(false)}
        content={
          <CraftedTodoEditor
            {...override}
            fullHeight
            disableCategories={['wrap', 'state', 'props']}
            typeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
            values={todos}
            onChange={handleTodos.change}
            onFetchData={handleFetch.data}
            onFetchDefinition={getTypeDefinition}
            onFetchTodoWrapper={handleFetch.wrapper}
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
