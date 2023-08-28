import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ConstructionIcon from '@mui/icons-material/Construction';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { CraftedWidgetEditor } from '@appcraft/craftsman';
import { useState } from 'react';
import type { WidgetState } from '@appcraft/types';

import * as Common from '../common';
import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Service from '~appcraft/services';
import { ResponsiveDrawer } from '~appcraft/styles';
import type * as Types from './WidgetEditor.types';

export default function WidgetEditor({
  ResponsiveDrawerProps,
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
  const rendererFetchHandles = Hook.useRendererFetchHandles();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  const renderOverrideItem = Hook.useCraftedWidgetOverride({
    STATE_PICKER: (category, props) => {
      const options: [string, WidgetState][] = Object.entries(
        Object.assign({}, ...Object.values(widget?.state || {}))
      );

      return (
        <Common.StateSelect
          {...(props as Omit<Common.StateSelectProps, 'options'>)}
          options={options.map(([path, { category, alias, description }]) => ({
            value: path,
            primary: alias,
            secondary: `${description || at('msg-no-description')} (${ct(
              `ttl-state-${category}`
            )})`,
          }))}
        />
      );
    },
    TODO_PICKER: (category, props) => (
      <Common.TodoWrapperSelect
        {...(props as Common.TodoWrapperSelectProps)}
        onView={onTodoWrapperView}
      />
    ),
    WIDGET_PICKER: (category, props) => (
      <Common.WidgetSelect
        {...(props as Common.WidgetSelectProps)}
        fullWidth
        size="small"
        variant="outlined"
        exclude={[data._id]}
        onView={onWidgetWrapperView}
      />
    ),
  });

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
        {...ResponsiveDrawerProps}
        ContentProps={{ style: { alignItems: 'center' } }}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        open={isSettingOpen}
        onClose={() => setOpen(false)}
        content={
          <CraftedRenderer
            options={widget}
            onFetchData={rendererFetchHandles.data}
            onFetchWrapper={rendererFetchHandles.wrapper}
            onOutputCollect={onOutputCollect}
          />
        }
        drawer={
          <CraftedWidgetEditor
            stateTypeFile={__WEBPACK_DEFINE__.STATE_TYPE_FILE}
            todoTypeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
            version={__WEBPACK_DEFINE__.VERSION}
            disableCategories={['props']}
            widget={widget}
            onWidgetChange={handleWidget.change}
            onFetchData={rendererFetchHandles.data}
            onFetchDefinition={Service.getTypeDefinition}
            onFetchNodesAndEvents={Service.getNodesAndEvents}
            onFetchWrapper={rendererFetchHandles.wrapper}
            renderOverrideItem={renderOverrideItem}
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
