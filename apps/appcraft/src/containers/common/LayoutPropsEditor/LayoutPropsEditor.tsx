import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import _set from 'lodash/set';
import { CraftedWidgetEditor, CraftsmanStyle } from '@appcraft/craftsman';

import * as Ctx from '~appcraft/contexts';
import { useWidgetTransform } from '~appcraft/hooks';
import type { LayoutPropsEditorProps } from './LayoutPropsEditor.types';

export default function LayoutPropsEditor({
  layouts,
  value,
  onChange,
  onClose,
}: LayoutPropsEditorProps) {
  const { template } = value;
  const [at] = Ctx.useFixedT('app');
  const [widget, fetchProps] = useWidgetTransform(value);
  const handleFetch = Ctx.useCraftsmanFetch();

  const override = Ctx.useCraftsmanOverrideContext({
    layouts,
    widget,
  });

  return (
    <CraftedWidgetEditor
      {...override}
      {...fetchProps}
      disableRemove
      disableState
      todoTypeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
      version={__WEBPACK_DEFINE__.VERSION}
      disableCategories={['state']}
      widget={widget}
      onFetchData={handleFetch.data}
      onFetchWrapper={handleFetch.wrapper}
      onWidgetChange={({ props, todos }) =>
        onChange({
          ..._set(value, ['template'], { ...template, props, todos }),
        })
      }
      title={
        <CraftsmanStyle.AutoBreakTypography
          primary={widget.type}
          secondary={widget.description}
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
