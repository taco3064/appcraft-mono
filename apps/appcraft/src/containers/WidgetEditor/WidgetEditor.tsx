import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { CraftedRenderer, CraftedWidgetEditor } from '@appcraft/mui';
import { useCallback, useState } from 'react';
import type { WidgetTodo } from '@appcraft/types';

import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Service from '~appcraft/services';
import { CommonButton, LazyMui, typeMap } from '~appcraft/components/common';
import { PersistentDrawerContent } from '~appcraft/styles';
import type { WidgetEditorProps } from './WidgetEditor.types';

export default function WidgetEditor({
  PersistentDrawerContentProps,
  data,
  superiors,
  onActionNodePick = (e) => e,
  onSave,
  onWrapTodoView,
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
        expand:
          !isCollapsable || isSettingOpen ? null : (
            <CommonButton
              btnVariant="icon"
              icon={<SettingsOutlinedIcon />}
              text={wt(`btn-expand-${isSettingOpen ? 'off' : 'on'}`)}
              onClick={() => setOpen(!open)}
            />
          ),
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={<RestartAltIcon />}
            text={at('btn-reset')}
            onClick={handleWidget.reset}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={<SaveAltIcon />}
            text={at('btn-save')}
            onClick={handleWidget.save}
          />
        ),
      }),
    [open, widget, isCollapsable, isSettingOpen]
  );

  return (
    <>
      {superiors && (
        <Comp.Breadcrumbs
          ToolbarProps={{ disableGutters: true }}
          action={actionNode}
          onCustomize={([index]) => [
            index,
            ...superiors.breadcrumbs,
            { text: superiors.names[data._id] },
          ]}
        />
      )}

      <PersistentDrawerContent
        {...PersistentDrawerContentProps}
        ContentProps={{ style: { alignItems: 'center' } }}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        open={isSettingOpen}
        content={
          <CraftedRenderer
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
          <CraftedWidgetEditor
            BackButtonProps={
              isCollapsable && {
                icon: <ChevronRightIcon />,
                text: at('btn-back'),
                onClick: () => setOpen(false),
              }
            }
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
            renderOverridePureItem={({ typeName, propPath, ...props }) => {
              if (typeName === 'WrapTodo' && propPath === 'todosId') {
                const { disabled, label, value, onChange } = props;

                return (
                  <Comp.WrapTodoSelect
                    {...{ disabled, label, onChange }}
                    value={value as string}
                    onTodoView={onWrapTodoView}
                  />
                );
              }

              return null;
            }}
          />
        }
      />
    </>
  );
}
