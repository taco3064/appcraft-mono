import * as Appcraft from '@appcraft/mui';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useCallback, useState } from 'react';

import * as Component from '~appcraft/components';
import * as Hooks from '~appcraft/hooks';
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
  const [at, ct, wt] = Hooks.useFixedT('app', 'appcraft', 'widgets');
  const [open, setOpen] = useState(true);

  const [widget, handleWidget] = Hooks.useWidgetValues({
    data,
    onSave,
  });

  const width = Hooks.useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;
  const toLazy = useCallback((widgetType: string) => LazyMui[widgetType], []);

  const actionNode = Hooks.useNodePicker(
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
      <Component.Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        action={actionNode}
        onCustomize={([index]) => [
          index,
          ...breadcrumbs,
          { text: names[data._id] },
        ]}
      />

      <Component.PersistentDrawerContent
        {...PersistentDrawerContentProps}
        ContentProps={{ style: { alignItems: 'center' } }}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        open={isSettingOpen}
        content={<Appcraft.CraftedRenderer lazy={toLazy} options={widget} />}
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
              <Component.WidgetSelect
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
