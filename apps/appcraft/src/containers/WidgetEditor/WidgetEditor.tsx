import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import Collapse from '@mui/material/Collapse';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Typography from '@mui/material/Typography';
import { MUI_WIDGETS } from '@appcraft/types';
import { TypesEditor, TypesEditorProps } from '@appcraft/mui';
import { useNodePicker } from '@appcraft/mui';
import { useState, useTransition } from 'react';

import * as Component from '~appcraft/components';
import TYPES_PARSER from '~appcraft/assets/json/types-parser.json';
import { CommonButton } from '~appcraft/components/common';
import { NestedElements } from '../NestedElements';
import { useFixedT, useWidth } from '~appcraft/hooks';
import { useValues } from './WidgetEditor.hooks';
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
  const [, setTransition] = useTransition();
  const [at, wt] = useFixedT('app', 'widgets');
  const [open, setOpen] = useState(true);

  const width = useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  const { values, widget, ...valuesHandle } = useValues(data);

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
            onClick={() =>
              setTransition(() => {
                // setValues(JSON.parse(JSON.stringify(data?.content || {})));
                // setMixedTypes(JSON.parse(JSON.stringify(data?.mapping || {})));
              })
            }
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
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        open={isSettingOpen}
        content="Content"
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
                <TypesEditor
                  {...widgets.get(widget.type)}
                  disableSelection
                  parser={TYPES_PARSER as TypesEditorProps['parser']}
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
