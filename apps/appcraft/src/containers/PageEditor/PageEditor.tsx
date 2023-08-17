import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { CraftedLayoutEditor } from '@appcraft/craftsman';
import { useState } from 'react';
import type { Breakpoint } from '@mui/system';

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
            onClick={handlePage.add}
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
    [items]
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
        disablePersistent
        open={isSettingOpen}
        onClose={() => setActive(undefined)}
        content={
          <Container
            disableGutters
            maxWidth={breakpoint}
            style={{ height: 'auto' }}
          >
            <CraftedRenderer
              elevation={1}
              options={items}
              onFetchData={rendererFetchHandles.data}
              onFetchWrapper={rendererFetchHandles.wrapper}
              onLayoutChange={(layouts) =>
                handlePage.layout(breakpoint, layouts)
              }
              onOutputCollect={onOutputCollect}
            />
          </Container>
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
