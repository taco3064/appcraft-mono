import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ConstructionIcon from '@mui/icons-material/Construction';
import MenuItem from '@mui/material/MenuItem';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { CraftedTodoEditor, CraftedWidgetEditor } from '@appcraft/craftsman';
import { useState } from 'react';
import type { TodosState, WidgetState } from '@appcraft/types';

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

  const override = Hook.useCraftedOverride({
    //* Mixed
    STATE_DEFAULT_PROP_VALUE: ({ values, options }) => ({
      ...options,
      options: [{ ...values.options, text: 'override' }],
    }),

    //* Naming
    TEMPLATE_TODO_NAMING: async ({ values, propPath }) => {
      const templateid: string = _get(values, 'template.id');

      const { state } = await rendererFetchHandles.wrapper(
        'widget',
        templateid
      );

      const options: [string, TodosState][] = Object.entries(
        _get(state, ['todos']) || {}
      );

      return {
        select: true,
        disabled: !options.length,
        children: options.map(([path, { alias }]) => (
          <MenuItem key={alias || path} value={alias || path}>
            {alias || path}{' '}
          </MenuItem>
        )),
      };
    },

    //* Render
    TEMPLATE_TODO_EDITOR: (category, props) => (
      <Comp.TodoItem
        {...(props as Comp.TodoItemProps)}
        renderTodoEditor={({ values, onChange, onEditToggle }) => (
          <CraftedTodoEditor
            {...override}
            {...{ values, onChange, onEditToggle }}
            disableCategories={['props']}
            fullHeight
            variant="normal"
            typeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
            onFetchData={rendererFetchHandles.data}
            onFetchDefinition={Service.getTypeDefinition}
            onFetchTodoWrapper={rendererFetchHandles.wrapper}
          />
        )}
      />
    ),
    TEMPLATE_WIDGET_PICKER: (category, props) => (
      <Common.WidgetSelect
        {...(props as Common.WidgetSelectProps)}
        fullWidth
        size="small"
        variant="outlined"
        exclude={[data._id]}
        onView={onWidgetWrapperView}
      />
    ),
    TODO_STATE_PATH_PICKER: (category, props) => {
      const options: [string, WidgetState][] = Object.entries(
        Object.assign(
          {},
          ...Object.values(_omit(widget?.state || {}, ['todos']))
        )
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
    TODO_WRAPPER_PICKER: (category, props) => (
      <Common.TodoWrapperSelect
        {...(props as Common.TodoWrapperSelectProps)}
        onView={onTodoWrapperView}
      />
    ),
  });

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
            {...override}
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
