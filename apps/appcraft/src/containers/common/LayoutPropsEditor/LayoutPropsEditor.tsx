import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { CraftedWidgetEditor, CraftsmanStyle } from '@appcraft/craftsman';
import type { NodeType } from '@appcraft/types';

import * as Ctx from '~appcraft/contexts';
import { NodeTemplateDialog } from '~appcraft/components';
import { useWidgetTransform } from '~appcraft/hooks';
import type { LayoutPropsEditorProps } from './LayoutPropsEditor.types';
import type { NodeTemplateDialogProps } from '~appcraft/components';

export default function LayoutPropsEditor({
  layouts,
  value,
  onChange,
  onClose,
}: LayoutPropsEditorProps) {
  const { template } = value;
  const [at] = Ctx.useFixedT('app');
  const [widget, fetchProps] = useWidgetTransform(value, { onChange, onClose });
  const handleFetch = Ctx.useCraftsmanFetch();

  const override = Ctx.useCraftsmanOverrideContext({
    layouts,
    widget,
  });

  const handleWidgetAdd = (
    type: NodeType,
    paths: (string | number)[],
    e: Parameters<NodeTemplateDialogProps['onConfirm']>[0]
  ) => {
    if (type === 'element') {
      onChange({
        ...value,
        template: { ..._set(template, paths, { id: e }) },
      });
    } else {
      const target = _get(template, paths) || [];

      target.push({ id: e });

      onChange({
        ...value,
        template: { ..._set(template, paths, target) },
      });
    }
  };

  return (
    <CraftedWidgetEditor
      {...override}
      {...fetchProps}
      disableState
      todoTypeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
      version={__WEBPACK_DEFINE__.VERSION}
      disableTodoCategories={['state']}
      widget={widget}
      onFetchData={handleFetch.data}
      onFetchWrapper={handleFetch.wrapper}
      isAllowedToAddWidget={({ childrenCount }) => childrenCount < 1}
      renderNewWidgetDialog={({ type, paths, open, onClose }) => (
        <NodeTemplateDialog
          {...{ open, onClose }}
          onConfirm={(e) => handleWidgetAdd(type, paths, e)}
        />
      )}
      title={
        <CraftsmanStyle.AutoBreakTypography
          primary={widget?.type}
          secondary={widget?.description}
          primaryTypographyProps={{
            whiteSpace: 'nowrap',
          }}
          secondaryTypographyProps={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      }
      BackButtonProps={{
        icon: <ChevronRightIcon />,
        text: at('btn-back'),
        onClick: onClose,
      }}
    />
  );
}
