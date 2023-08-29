import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CraftedWidgetEditor, CraftsmanStyle } from '@appcraft/craftsman';

import * as Ctx from '~appcraft/contexts';
import * as Service from '~appcraft/services';
import { useWidgetTransform } from '~appcraft/hooks';
import type { LayoutPropsEditorProps } from './LayoutPropsEditor.types';

export default function LayoutPropsEditor({
  layouts,
  value,
  onChange,
  onClose,
}: LayoutPropsEditorProps) {
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
      onWidgetChange={console.log} //! 想辦法接到 onChange
      onFetchData={handleFetch.data}
      onFetchWrapper={handleFetch.wrapper}
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
