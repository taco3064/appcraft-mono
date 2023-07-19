import * as Appcraft from '@appcraft/mui';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useCallback, useState } from 'react';
import type { WidgetTodo } from '@appcraft/types';

import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Service from '~appcraft/services';
import { CommonButton, LazyMui, typeMap } from '~appcraft/components/common';
import type { WidgetEditorProps } from './WidgetEditor.types';

export default function WidgetEditor({
  PersistentDrawerContentProps,
  data,
  superiors: { names, breadcrumbs },
  onActionNodePick = (e) => e,
  onSave,
}: WidgetEditorProps) {
  const [at, ct, wt] = Hook.useFixedT('app', 'appcraft', 'widgets');
  const [open, setOpen] = useState(true);

  const [widget, handleWidget] = Hook.useWidgetValues({
    data,
    onSave,
  });

  const width = Hook.useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;
  const toLazy = useCallback((widgetType: string) => LazyMui[widgetType], []);

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        expand: !isCollapsable ? null : (
          <CommonButton
            btnVariant="icon"
            icon={open ? AutoFixOffIcon : AutoFixHighIcon}
            text={wt(`btn-expand-${isSettingOpen ? 'off' : 'on'}`)}
            onClick={() => setOpen(!open)}
          />
        ),
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={RestartAltIcon}
            text={at('btn-reset')}
            onClick={handleWidget.reset}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={SaveAltIcon}
            text={at('btn-save')}
            onClick={handleWidget.save}
          />
        ),
      }),
    [open, widget, isCollapsable, isSettingOpen]
  );

  return (
    <>
      <Comp.Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        action={actionNode}
        onCustomize={([index]) => [
          index,
          ...breadcrumbs,
          { text: names[data._id] },
        ]}
      />

      <Comp.PersistentDrawerContent
        {...PersistentDrawerContentProps}
        ContentProps={{ style: { alignItems: 'center' } }}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        open={isSettingOpen}
        content={
          <Appcraft.CraftedRenderer
            lazy={toLazy}
            options={widget}
            fetchTodoWrap={async (id) => {
              const { content } = await Service.getConfigById<
                Record<string, WidgetTodo>
              >(id);

              return content;
            }}
          />
        }
        drawer={
          <Appcraft.CraftedWidgetEditor
            fixedT={ct}
            todoTypeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
            version={__WEBPACK_DEFINE__.VERSION}
            widget={widget}
            onWidgetChange={handleWidget.change}
            onFetchNodesAndEvents={Service.getNodesAndEvents}
            onFetchConfigDefinition={(...e) =>
              Service.getTypeDefinition(Service.Parser.Config, ...e)
            }
            onFetchWidgetDefinition={(...e) =>
              Service.getTypeDefinition(Service.Parser.Widget, ...e)
            }
            renderWidgetTypeSelection={({ onChange }) => (
              <Comp.WidgetSelect
                fullWidth
                required
                size="small"
                margin="dense"
                variant="outlined"
                label={wt('lbl-widget-type')}
                defaultValue=""
                onChange={({ target: { value } }) =>
                  onChange({
                    type: value,
                    typeName: value,
                    typeFile: typeMap.get(value),
                  })
                }
              />
            )}
          />
        }
      />
    </>
  );
}
