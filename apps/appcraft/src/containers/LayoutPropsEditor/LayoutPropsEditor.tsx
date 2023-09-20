import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import _set from 'lodash/set';
import { CraftedWidgetEditor, CraftsmanStyle } from '@appcraft/craftsman';

import * as Hook from '~appcraft/hooks';
import NodeTemplateDialog from '../NodeTemplateDialog';
import { useCraftsmanOverride } from '~appcraft/contexts';
import type { LayoutPropsEditorProps } from './LayoutPropsEditor.types';

export default function LayoutPropsEditor({
  layouts,
  value,
  getWidgetOptions,
  onChange,
  onClose,
}: LayoutPropsEditorProps) {
  const [widget, fetchProps] = Hook.useWidgetTransform(value, {
    getWidgetOptions,
    onChange,
    onClose,
  });

  const { template } = value;
  const [at] = Hook.useFixedT('app');
  const [links, onLinkSet] = Hook.useLayoutLinks(value, onChange);
  const handleFetch = Hook.useCraftsmanFetch();
  const override = useCraftsmanOverride({ layouts, widget });

  const handleWidgetAdd = (paths: (string | number)[], id: string) =>
    onChange({
      ...value,
      template: { ..._set(template, paths, { id }) },
    });

  return (
    <CraftedWidgetEditor
      {...fetchProps}
      {...override}
      GeneratedTodoOverrideProps={{ layout: value }}
      disableSelection
      disableTodoCategories={['state']}
      todoTypeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
      version={__WEBPACK_DEFINE__.VERSION}
      widget={widget}
      onFetchData={handleFetch.data}
      onFetchWrapper={handleFetch.wrapper}
      renderNewWidgetDialog={({ paths, open, onClose }) => (
        <NodeTemplateDialog
          {...{ open, onClose }}
          onConfirm={(e) => handleWidgetAdd(paths, e)}
        />
      )}
      secondaryActions={{
        todos: ({ path }) => (
          <CraftsmanStyle.IconSwitch
            value={links.has(path) ? 'link' : 'unlink'}
            onChange={() => onLinkSet(path)}
            options={{
              unlink: { icon: LinkOffIcon },
              link: { icon: LinkIcon, color: 'info' },
            }}
          />
        ),
      }}
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
