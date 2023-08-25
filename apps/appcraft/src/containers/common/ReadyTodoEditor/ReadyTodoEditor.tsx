import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Button from '@mui/material/Button';
import { CraftsmanStyle, CraftedTodoEditor } from '@appcraft/craftsman';
import { useState } from 'react';

import TodoWrapperSelect from '../TodoWrapperSelect';
import WidgetSelect from '../WidgetSelect';
import { CommonButton } from '~appcraft/components';
import { getTypeDefinition } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './ReadyTodoEditor.types';
import type { PageData } from '~appcraft/hooks';
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
    /^props\[\\d\]\.widget$/
  ) {
    return 'PROPS_WIDGET';
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
          onFetchDefinition={getTypeDefinition}
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
                return (
                  <WidgetSelect
                    {...(props as WidgetSelectProps)}
                    size="small"
                    variant="outlined"
                    targets={layouts.map(({ template }) => template?.id)}
                    onView={onWidgetWrapperView}
                  />
                );
              }
            }
          }}
        />
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
