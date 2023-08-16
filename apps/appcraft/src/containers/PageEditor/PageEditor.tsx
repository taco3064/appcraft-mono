import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import * as Common from '../common';
import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
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
  const [page, handlePage] = Hook.usePageValues({ data, onSave });

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
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
    [page]
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
    </>
  );
}
