import * as Appcraft from '@appcraft/mui';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import Collapse from '@mui/material/Collapse';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Typography from '@mui/material/Typography';
import { MUI_WIDGETS } from '@appcraft/types';
import { useState } from 'react';

import * as Component from '~appcraft/components';
import TYPES_PARSER from '~appcraft/assets/json/types-parser.json';
import { CommonButton } from '~appcraft/components/common';
import { NestedElements } from '../NestedElements';
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
  const [at, wt] = useFixedT('app', 'widgets');
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
        content={<Appcraft.CraftedRenderer options={values} />}
        drawer={
          <>
            <Component.WidgetEditorBar
              widget={widget}
              onElementAdd={valuesHandle.onWidgetAdd}
              onBackToElements={() => valuesHandle.onEditingChange(null)}
              onValueChange={valuesHandle.onWidgetChange}
            />

            <Collapse in={Boolean(!widget)}>
              <NestedElements
                widgets={values.widgets}
                onWidgetClick={valuesHandle.onEditingChange}
              />
            </Collapse>

            <Collapse in={Boolean(widget)}>
              {!widget?.type ? (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  align="center"
                  sx={{
                    justifyContent: 'center',
                    marginTop: (theme) => theme.spacing(2),
                  }}
                >
                  {wt('msg-select-widget-type-first')}
                </Typography>
              ) : (
                <Appcraft.CraftedEditor
                  {...widgets.get(widget.type)}
                  disableSelection
                  parser={TYPES_PARSER as Appcraft.CraftedEditorProps['parser']}
                  mixedTypes={widget.mapping}
                  values={widget.content}
                  onChange={(content) =>
                    valuesHandle.onWidgetChange('content', content)
                  }
                  onMixedTypeMapping={(mapping) =>
                    valuesHandle.onWidgetChange('mapping', mapping)
                  }
                />
              )}
            </Collapse>
          </>
        }
      />
    </>
  );
}
