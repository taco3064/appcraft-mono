import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import _set from 'lodash/set';
import { CraftedWidgetEditor, CraftsmanStyle } from '@appcraft/craftsman';

import NodeTemplateDialog from '../NodeTemplateDialog';
import { useCraftsmanFetch, useFixedT } from '~appcraft/hooks/common';
import { useCraftsmanOverrideContext } from '~appcraft/contexts';
import { useWidgetTransform } from '~appcraft/hooks';
import type { LayoutPropsEditorProps } from './LayoutPropsEditor.types';

export default function LayoutPropsEditor({
  layouts,
  value,
  onChange,
  onClose,
}: LayoutPropsEditorProps) {
  const { template } = value;
  const [at] = useFixedT('app');
  const [widget, fetchProps] = useWidgetTransform(value, { onChange, onClose });
  const handleFetch = useCraftsmanFetch();
  const override = useCraftsmanOverrideContext({ layouts, widget });

  const handleWidgetAdd = (paths: (string | number)[], id: string) =>
    onChange({
      ...value,
      template: { ..._set(template, paths, { id }) },
    });

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
      renderNewWidgetDialog={({ paths, open, onClose }) => (
        <NodeTemplateDialog
          {...{ open, onClose }}
          onConfirm={(e) => handleWidgetAdd(paths, e)}
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
