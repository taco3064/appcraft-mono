import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedEditor, CraftedRenderer } from '@appcraft/mui';
import { MUI_WIDGETS } from '@appcraft/types';
import { useState } from 'react';

import * as Component from '~appcraft/components';
import TYPES_PARSER from '~appcraft/assets/json/types-parser.json';
import { CommonButton } from '~appcraft/components/common';
import { useEditedValues } from './WidgetEditor.hooks';
import { useFixedT, useNodePicker, useWidth } from '~appcraft/hooks';
import type * as Types from './WidgetEditor.types';

const widgets = MUI_WIDGETS.widgets.reduce<Types.WidgetMap>(
  (result, { components }) => {
    components.forEach(({ id, typeFile, typeName }) =>
      result.set(id, { typeFile, typeName })
    );

    return result;
  },
  new Map()
);

export default function WidgetEditor({
  PersistentDrawerContentProps,
  data,
  superiors: { names, breadcrumbs },
  onActionNodePick = (e) => e,
}: Types.WidgetEditorProps) {
  const [at, ct, wt] = useFixedT('app', 'appcraft', 'widgets');
  const [open, setOpen] = useState(true);
  const { values, widget, ...valuesHandle } = useEditedValues(data);

  const width = useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  const actionNode = useNodePicker(
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
            onClick={() => valuesHandle.onReset()}
          />
        ),
        save: (
          <CommonButton
            btnVariant="icon"
            icon={SaveAltIcon}
            text={at('btn-save')}
            onClick={() => null}
          />
        ),
      }),
    [open, isCollapsable, isSettingOpen]
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
        content={<CraftedRenderer options={values} />}
        drawer={
          <CraftedEditor
            {...widgets.get(widget?.type)}
            fixedT={ct}
            parser={TYPES_PARSER as object}
            widget={widget}
            widgets={values.widgets}
            onBackToElements={() => valuesHandle.onEditingChange(null)}
            onChange={valuesHandle.onWidgetChange}
            onElementAdd={valuesHandle.onWidgetAdd}
            onWidgetSelect={valuesHandle.onEditingChange}
            select={
              <Component.WidgetSelect
                fullWidth
                size="small"
                margin="dense"
                variant="outlined"
                label={wt('lbl-widget-type')}
                defaultValue={widget?.type}
                onChange={(e) =>
                  valuesHandle.onWidgetChange('type', e.target.value)
                }
              />
            }
          />
        }
      />
    </>
  );
}
