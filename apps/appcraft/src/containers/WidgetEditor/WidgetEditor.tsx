import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import Collapse from '@mui/material/Collapse';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import _set from 'lodash.set';
import { TypesEditor, TypesEditorProps } from '@appcraft/mui';
import { useNodePicker } from '@appcraft/mui';
import { useState, useTransition } from 'react';
import type { WidgetOptions } from '@appcraft/types';

import * as Component from '~appcraft/components';
import TYPES_PARSER from '~appcraft/assets/json/types-parser.json';
import WIDGETS from '~appcraft/assets/json/widgets.json';
import { CommonButton } from '~appcraft/components/common';
import { NestedElements } from '../NestedElements';
import { useFixedT, useWidth } from '~appcraft/hooks';
import type * as Types from './WidgetEditor.types';

const widgets = WIDGETS.reduce<Types.WidgetMap>((result, { components }) => {
  components.forEach(({ id, typeFile, typeName }) =>
    result.set(id, { typeFile, typeName })
  );

  return result;
}, new Map());

export default function WidgetEditor({
  PersistentDrawerContentProps,
  data,
  superiors: { names, breadcrumbs },
  onActionNodePick = (e) => e,
}: Types.WidgetEditorProps) {
  const [, setTransition] = useTransition();
  const [at, wt] = useFixedT('app', 'widgets');
  const [open, setOpen] = useState(true);
  const [widget, setWidget] = useState<WidgetOptions | null>(null);

  const barVariant = widget ? 'props' : 'elements';
  const width = useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  const [values, setValues] = useState<Types.WidgetConfig>(() =>
    JSON.parse(JSON.stringify(data?.content || {}))
  );

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

  const handleElementAdd = (id) =>
    setValues({
      ...values,
      widgets: [
        ...(values.widgets || []),
        { id, type: '', description: '', content: {}, mapping: {} },
      ],
    });

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
              variant={barVariant}
              accordion={
                widget && (
                  <>
                    <Component.WidgetSelect
                      fullWidth
                      size="small"
                      margin="dense"
                      variant="outlined"
                      label={wt('lbl-widget-type')}
                      defaultValue={widget.type}
                      onChange={(e) =>
                        setWidget({ ..._set(widget, 'type', e.target.value) })
                      }
                    />

                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      variant="outlined"
                      label={wt('lbl-description')}
                      defaultValue={widget.description}
                      onChange={(e) =>
                        setWidget({
                          ..._set(widget, 'description', e.target.value),
                        })
                      }
                    />
                  </>
                )
              }
              onElementAdd={handleElementAdd}
              onVariantChange={(variant) =>
                setWidget(variant === 'elements' ? null : widget)
              }
            />

            <Collapse in={Boolean(!widget)}>
              <NestedElements
                widgets={values.widgets}
                onWidgetClick={setWidget}
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
                    setWidget({ ..._set(widget, 'content', content) })
                  }
                  onMixedTypeMapping={(mapping) =>
                    setWidget({ ..._set(widget, 'mapping', mapping) })
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
