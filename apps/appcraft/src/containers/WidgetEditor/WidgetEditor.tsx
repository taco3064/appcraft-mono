import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ConstructionIcon from '@mui/icons-material/Construction';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CraftedRenderer, useWidth } from '@appcraft/exhibitor';
import { CraftedWidgetEditor } from '@appcraft/craftsman';
import { useState } from 'react';

import * as Hook from '~appcraft/hooks';
import Breadcrumbs from '../Breadcrumbs';
import { CommonButton } from '~appcraft/components';
import { ResponsiveDrawer } from '~appcraft/styles';
import { getNodesAndEvents, getTypeDefinition } from '~appcraft/services';
import { useCraftsmanOverride } from '~appcraft/contexts';
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
  const [widget, handleWidget] = Hook.useWidgetValues({ data, onSave });

  const width = useWidth();
  const override = useCraftsmanOverride({ widget });
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
        DrawerProps={{ maxWidth: 'xs' }}
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
            disableTodoCategories={['props', 'search']}
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
