import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import Grow from '@mui/material/Grow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useQuery } from '@tanstack/react-query';
import { useState, useTransition } from 'react';

import * as Component from '~appcraft/components';
import { CommonButton } from '~appcraft/components/common';
import { NestedElements } from '../NestedElements';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './WidgetEditor.types';

export default function WidgetEditor({
  PersistentDrawerContentProps,
  data,
  superiors: { names, breadcrumbs },
  onActionNodePick,
}: Types.WidgetEditorProps) {
  const [, setTransition] = useTransition();
  const [at, wt] = useFixedT('app', 'widgets');
  const [open, setOpen] = useState(true);
  const [widget, setWidget] = useState<string | null>(null);

  const [values, setValues] = useState<Types.WidgetConfig>(() =>
    JSON.parse(JSON.stringify(data?.content || {}))
  );

  const { data: action } = useQuery({
    suspense: false,
    queryKey: [open],
    queryFn: () =>
      onActionNodePick({
        expand: (
          <CommonButton
            btnVariant="icon"
            icon={open ? AutoFixOffIcon : AutoFixHighIcon}
            text={wt(`btn-expand-${open ? 'off' : 'on'}`)}
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
  });

  return (
    <>
      <Component.Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        action={
          Object.values(action || {}).some((node) => node) && (
            <>
              {action.expand}
              {action.reset}
              {action.save}
            </>
          )
        }
        onCustomize={($breadcrumbs) => {
          $breadcrumbs.splice(1, 1, ...breadcrumbs);

          return [...breadcrumbs, { text: names[data._id] }];
        }}
      />

      <Component.PersistentDrawerContent
        {...PersistentDrawerContentProps}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        open={open}
        drawer={
          <>
            <Component.WidgetEditorBar
              variant={widget ? 'props' : 'elements'}
              onElementAdd={(id) =>
                setValues({
                  ...values,
                  widgets: [...(values.widgets || []), { id }],
                })
              }
              onVariantChange={(variant) =>
                setWidget(variant === 'elements' ? null : widget)
              }
            />

            <Grow in={Boolean(!widget)}>
              <div>
                <NestedElements
                  widgets={values.widgets}
                  onWidgetClick={setWidget}
                />
              </div>
            </Grow>
          </>
        }
      >
        Content
      </Component.PersistentDrawerContent>
    </>
  );
}
