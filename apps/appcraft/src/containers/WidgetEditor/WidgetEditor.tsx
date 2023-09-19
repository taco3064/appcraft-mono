import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ConstructionIcon from '@mui/icons-material/Construction';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedRenderer } from '@appcraft/exhibitor';
import { CraftedWidgetEditor } from '@appcraft/craftsman';
import { useState } from 'react';

import * as Hook from '~appcraft/hooks/common';
import { Breadcrumbs } from '../common';
import { CommonButton } from '~appcraft/components/common';
import { ResponsiveDrawer } from '~appcraft/styles';
import { getNodesAndEvents, getTypeDefinition } from '~appcraft/services';
import { useCraftsmanOverrideContext } from '~appcraft/contexts/common';
import { useWidgetValues } from '~appcraft/hooks';
import type * as Types from './WidgetEditor.types';

export default function WidgetEditor({
  ResponsiveDrawerProps,
  data,
  superiors,
  onActionNodePick = (e) => e,
  onOutputCollect,
  onSave,
}: Types.WidgetEditorProps) {
  const [at, wt] = Hook.useFixedT('app', 'widgets');
  const [open, setOpen] = useState(false);
  const [widget, handleWidget] = useWidgetValues({ data, onSave });

  const width = Hook.useWidth();
  const override = useCraftsmanOverrideContext({ widget });
  const handleFetch = Hook.useCraftsmanFetch();
  const isCollapsable = /^(xs|sm)$/.test(width);
  const isSettingOpen = !isCollapsable || open;

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        expand:
          !isCollapsable || isSettingOpen ? null : (
            <CommonButton
              btnVariant="icon"
              icon={<ConstructionIcon />}
              text={wt(`btn-expand-${isSettingOpen ? 'off' : 'on'}`)}
              onClick={() => setOpen(!open)}
            />
          ),
        reset: (
          <CommonButton
            btnVariant="icon"
            icon={<RestartAltIcon />}
            text={at('btn-reset')}
            onClick={handleWidget.reset}
          />
        ),
        save: (
          <CommonButton
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
        <Breadcrumbs
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
            onFetchData={handleFetch.data}
            onFetchWrapper={handleFetch.wrapper}
            onOutputCollect={onOutputCollect}
          />
        }
        drawer={
          <CraftedWidgetEditor
            {...override}
            stateTypeFile={__WEBPACK_DEFINE__.STATE_TYPE_FILE}
            todoTypeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
            version={__WEBPACK_DEFINE__.VERSION}
            disableTodoCategories={['props']}
            widget={widget}
            onWidgetChange={handleWidget.change}
            onFetchData={handleFetch.data}
            onFetchDefinition={getTypeDefinition}
            onFetchNodesAndEvents={getNodesAndEvents}
            onFetchWrapper={handleFetch.wrapper}
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
