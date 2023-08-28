import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Button from '@mui/material/Button';
import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { CraftsmanStyle, CraftedTodoEditor } from '@appcraft/craftsman';
import { useState } from 'react';

import PropNameSelect from '../PropNameSelect';
import TodoWrapperSelect from '../TodoWrapperSelect';
import WidgetSelect from '../WidgetSelect';
import { CommonButton } from '~appcraft/components';
import { getTypeDefinition } from '~appcraft/services';
import { useFixedT, useRendererFetchHandles } from '~appcraft/hooks';
import type * as Types from './ReadyTodoEditor.types';
import type { PageData } from '~appcraft/hooks';
import type { PropNameSelectProps } from '../PropNameSelect';
import type { TodoWrapperSelectProps } from '../TodoWrapperSelect';
import type { WidgetSelectProps } from '../WidgetSelect';

const getOverrideRenderType: Types.GetOverrideRenderType = (
  kind,
  { typeName, propPath }
) => {
  if (kind === 'pure' && typeName === 'WrapTodo' && propPath === 'todosId') {
    return 'TODO_PICKER';
  } else if (
    kind === 'pure' &&
    typeName === 'SetPropsTodo' &&
    /^props\[\d\]\.widget$/.test(propPath)
  ) {
    return 'PROPS_WIDGET';
  } else if (
    kind === 'pure' &&
    typeName === 'SetPropsTodo' &&
    /^props\[\d\]\.propName$/.test(propPath)
  ) {
    return 'PROPS_PICKER';
  }
};

export default function ReadyTodoEditor({
  layouts,
  value,
  onConfirm,
  onTodoWrapperView,
  onWidgetWrapperView,
}: Types.ReadyTodoEditorProps) {
  const [at, pt] = useFixedT('app', 'pages');
  const [open, setOpen] = useState(false);
  const rendererFetchHandles = useRendererFetchHandles();

  const [todos, setTodos] = useState<PageData['readyTodos']>(() =>
    JSON.parse(JSON.stringify(value))
  );

  return (
    <>
      <CommonButton
        btnVariant="icon"
        icon={<AlarmOnIcon />}
        text={pt('btn-ready-todo')}
        onClick={() => setOpen(true)}
      />

      <CraftsmanStyle.FlexDialog
        fullScreen
        direction="column"
        title={{ primary: pt('ttl-ready-todo') }}
        open={open}
        onClose={() => setOpen(false)}
        action={
          <>
            <Button color="inherit" onClick={() => setOpen(false)}>
              {at('btn-cancel')}
            </Button>

            <Button
              type="submit"
              color="primary"
              onClick={() => {
                onConfirm(todos);
                setOpen(false);
              }}
            >
              {at('btn-confirm')}
            </Button>
          </>
        }
        PaperProps={{
          sx: (theme) => ({
            '& > .MuiDialogContent-root': {
              height: `calc(100vh - ${theme.spacing(24)})`,
            },
          }),
        }}
      >
        <CraftedTodoEditor
          fullHeight
          disableCategories={['state']}
          typeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
          values={todos}
          onChange={setTodos}
          onFetchData={rendererFetchHandles.data}
          onFetchDefinition={getTypeDefinition}
          onFetchTodoWrapper={rendererFetchHandles.wrapper}
          renderOverrideItem={(...args) => {
            const [, props] = args;

            switch (getOverrideRenderType(...args)) {
              case 'TODO_PICKER': {
                return (
                  <TodoWrapperSelect
                    {...(props as TodoWrapperSelectProps)}
                    onView={onTodoWrapperView}
                  />
                );
              }
              case 'PROPS_WIDGET': {
                const { value } = props as WidgetSelectProps;

                return (
                  <WidgetSelect
                    {...(props as WidgetSelectProps)}
                    fullWidth
                    required
                    size="small"
                    variant="outlined"
                    error={!value}
                    helperText={!value ? at('msg-required') : undefined}
                    targets={layouts.map(({ template }) => template?.id)}
                    onView={onWidgetWrapperView}
                  />
                );
              }
              case 'PROPS_PICKER': {
                const { value } = props as WidgetSelectProps;

                const propPath = _toPath(
                  props.propPath.replace(/\.propName$/, '.widget')
                );

                return (
                  <PropNameSelect
                    {...(props as PropNameSelectProps)}
                    fullWidth
                    required
                    size="small"
                    variant="outlined"
                    template={_get(props, ['props', ...propPath])}
                    error={!value}
                    helperText={!value ? at('msg-required') : undefined}
                  />
                );
              }
              default:
            }
          }}
        />
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
