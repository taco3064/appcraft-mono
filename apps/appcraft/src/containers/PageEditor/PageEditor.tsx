import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Toolbar from '@mui/material/Toolbar';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { CraftedLayoutEditor } from '@appcraft/craftsman';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import type { Breakpoint } from '@mui/material/styles';

import * as Common from '../common';
import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import { ResponsiveDrawer } from '~appcraft/styles';
import type * as Types from './PageEditor.types';

export default function PageEditor({
  ResponsiveDrawerProps,
  data,
  superiors,
  onActionNodePick = (e) => e,
  onOutputCollect,
  onSave,
  onTodoWrapperView,
  onWidgetWrapperView,
}: Types.PageEditorProps) {
  const [at, ct, pt] = Hook.useFixedT('app', 'appcraft', 'pages');
  const [items, handlePage] = Hook.usePageValues({ data, onSave });
  const [active, setActive] = useState<number>();
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  const theme = useTheme();
  const rendererFetchHandles = Hook.useRendererFetchHandles();
  const isSettingOpen = Boolean(items[active]);

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        add: (
          <Comp.CommonButton
            btnVariant="icon"
            icon={<AddIcon />}
            text={at('btn-add')}
            onClick={console.log}
          />
        ),
        reset: (
          <Comp.CommonButton
            btnVariant="icon"
            icon={<RestartAltIcon />}
            text={at('btn-reset')}
            onClick={handlePage.reset}
          />
        ),
        save: (
          <Comp.CommonButton
            btnVariant="icon"
            icon={<SaveAltIcon />}
            text={at('btn-save')}
            onClick={handlePage.save}
          />
        ),
      }),
    [breakpoint, items]
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
        ContentProps={{
          style: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            overflow: 'hidden',
          },
        }}
        DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
        disablePersistent
        open={isSettingOpen}
        onClose={() => setActive(undefined)}
        content={
          <>
            {/* Breakpoint Stepper */}
            {/* CraftedRenderer */}
          </>
        }
        drawer={
          !isSettingOpen ? null : (
            <CraftedLayoutEditor
              layout={items[active]}
              onFetchWidgetWrapper={rendererFetchHandles.wrapper}
              onLayoutChange={(layout) => {
                items.splice(active, 1, layout);
                handlePage.change([...items]);
              }}
            />
          )
        }
      />
    </>
  );
}
