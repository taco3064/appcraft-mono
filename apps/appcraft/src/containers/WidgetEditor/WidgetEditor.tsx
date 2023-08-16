import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ConstructionIcon from '@mui/icons-material/Construction';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import axios from 'axios';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { CraftedWidgetEditor } from '@appcraft/craftsman';
import { useState } from 'react';
import type { MainWidget, WidgetState, WidgetTodo } from '@appcraft/types';

import * as Common from '../common';
import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Service from '~appcraft/services';
import { ResponsiveDrawer } from '~appcraft/styles';
import type * as Types from './WidgetEditor.types';

const getOverrideRenderType: Types.GetOverrideRenderType = (
  kind,
  { typeName, propPath }
) => {
  if (
    kind === 'pure' &&
    /^(ElementState|NodeState)$/.test(typeName) &&
    propPath === 'template.id'
  ) {
    return 'WIDGET_PICKER';
  } else if (
    kind === 'pure' &&
    typeName === 'WrapTodo' &&
    propPath === 'todosId'
  ) {
    return 'TODO_PICKER';
  } else if (
    kind === 'pure' &&
    typeName === 'SetStateTodo' &&
    /^states\[\d+\]\.state$/.test(propPath)
  ) {
    return 'STATE_PICKER';
  }
};

export default function WidgetEditor({
  PersistentDrawerContentProps,
  data,
  superiors,
  onActionNodePick = (e) => e,
  onOutputCollect,
  onSave,
  onTodoWrapperView,
  onWidgetWrapperView,
}: Types.WidgetEditorProps) {
  const [at, ct, wt] = Hook.useFixedT('app', 'appcraft', 'widgets');
  const [open, setOpen] = useState(false);
  const [widget, handleWidget] = Hook.useWidgetValues({ data, onSave });

  const width = Hook.useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  const handleFetchData: Types.HandleFetchData = async ({
    url,
    method,
    headers,
    data,
  }) => {
    const { data: result } = await axios({
      url,
      method,
      headers,
      ...(data && { data }),
    });

    return result;
  };

  const handleFetchWrapper: Types.HandleFetchWrapper = async (category, id) => {
    const { content } = await Service.getConfigById<
      typeof category extends 'widget' ? MainWidget : Record<string, WidgetTodo>
    >(id);

    return content;
  };

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        expand:
          !isCollapsable || isSettingOpen ? null : (
            <Comp.CommonButton
              btnVariant="icon"
              icon={<ConstructionIcon />}
              text={wt(`btn-expand-${isSettingOpen ? 'off' : 'on'}`)}
              onClick={() => setOpen(!open)}
            />
          ),
        reset: (
          <Comp.CommonButton
            btnVariant="icon"
            icon={<RestartAltIcon />}
            text={at('btn-reset')}
            onClick={handleWidget.reset}
          />
        ),
        save: (
          <Comp.CommonButton
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
        <Common.Breadcrumbs
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
        {...PersistentDrawerContentProps}
        ContentProps={{ style: { alignItems: 'center' } }}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        open={isSettingOpen}
        onClose={() => setOpen(false)}
        content={
          <CraftedRenderer
            options={widget}
            onFetchData={handleFetchData}
            onFetchWrapper={handleFetchWrapper}
            onOutputCollect={onOutputCollect}
          />
        }
        drawer={
          <CraftedWidgetEditor
            fixedT={ct}
            stateTypeFile={__WEBPACK_DEFINE__.STATE_TYPE_FILE}
            todoTypeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
            version={__WEBPACK_DEFINE__.VERSION}
            widget={widget}
            onWidgetChange={handleWidget.change}
            onFetchDefinition={Service.getTypeDefinition}
            onFetchNodesAndEvents={Service.getNodesAndEvents}
            onFetchWidgetWrapper={handleFetchWrapper}
            renderOverrideItem={(...args) => {
              const [, props] = args;

              switch (getOverrideRenderType(...args)) {
                case 'STATE_PICKER': {
                  const options: [string, WidgetState][] = Object.entries(
                    Object.assign({}, ...Object.values(widget?.state || {}))
                  );

                  return (
                    <Common.StateSelect
                      {...(props as Omit<Common.StateSelectProps, 'options'>)}
                      options={options.map(
                        ([path, { alias, description }]) => ({
                          value: path,
                          primary: alias,
                          secondary: description,
                        })
                      )}
                    />
                  );
                }
                case 'TODO_PICKER':
                  return (
                    <Common.TodoWrapperSelect
                      {...(props as Common.TodoWrapperSelectProps)}
                      onView={onTodoWrapperView}
                    />
                  );

                case 'WIDGET_PICKER':
                  return (
                    <Common.WidgetSelect
                      {...(props as Common.WidgetSelectProps)}
                      exclude={[data._id]}
                      onView={onWidgetWrapperView}
                    />
                  );
                default:
              }
            }}
            BackButtonProps={
              isCollapsable && {
                icon: <ChevronRightIcon />,
                text: at('btn-back'),
                onClick: () => setOpen(false),
              }
            }
          />
        }
      />
    </>
  );
}
