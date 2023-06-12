import * as Appcraft from '@appcraft/mui';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Components, useTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';

import * as Component from '~appcraft/components';
import TYPES_FETCH_OPTIONS from '~appcraft/assets/json/types-fetch-options.json';
import { CommonButton, LazyMui } from '~appcraft/components/common';
import { useEditedWidget } from './WidgetEditor.hooks';
import { useFixedT, useNodePicker, useWidth } from '~appcraft/hooks';
import type { WidgetEditorProps } from './WidgetEditor.types';

export default function WidgetEditor({
  PersistentDrawerContentProps,
  data,
  superiors: { names, breadcrumbs },
  onActionNodePick = (e) => e,
}: WidgetEditorProps) {
  const [at, ct, wt] = useFixedT('app', 'appcraft', 'widgets');
  const [open, setOpen] = useState(true);
  const { widget, onReset, onWidgetChange } = useEditedWidget(data);

  const theme = useTheme();
  const width = useWidth();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;
  const toLazy = useCallback((widgetType: string) => LazyMui[widgetType], []);

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
            onClick={onReset}
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
        content={<Appcraft.CraftedRenderer lazy={toLazy} options={widget} />}
        drawer={
          <Appcraft.CraftedWidgetEditor
            fetchOptions={
              TYPES_FETCH_OPTIONS as Appcraft.CraftedWidgetEditorProps['fetchOptions']
            }
            fixedT={ct}
            widget={widget}
            onWidgetChange={onWidgetChange}
            defaultValues={
              theme.components[`Mui${widget?.type}` as keyof Components]
                ?.defaultProps || {}
            }
            renderWidgetTypeSelection={(onChange) => (
              <Component.WidgetSelect
                {...{ onChange }}
                fullWidth
                required
                autoFocus
                size="small"
                margin="dense"
                variant="outlined"
                label={wt('lbl-widget-type')}
                defaultValue=""
              />
            )}
          />
        }
      />
    </>
  );
}
