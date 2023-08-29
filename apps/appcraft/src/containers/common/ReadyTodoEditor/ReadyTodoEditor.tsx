import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Button from '@mui/material/Button';
import { CraftsmanStyle, CraftedTodoEditor } from '@appcraft/craftsman';
import { useState } from 'react';

import * as Ctx from '~appcraft/contexts';
import { CommonButton } from '~appcraft/components';
import { getTypeDefinition } from '~appcraft/services';
import type * as Types from './ReadyTodoEditor.types';
import type { PageData } from '~appcraft/hooks';

export default function ReadyTodoEditor({
  layouts,
  value,
  onConfirm,
}: Types.ReadyTodoEditorProps) {
  const [at, pt] = Ctx.useFixedT('app', 'pages');
  const [open, setOpen] = useState(false);
  const handleFetch = Ctx.useCraftsmanFetch();
  const override = Ctx.useCraftsmanOverrideContext({ layouts });

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
          {...override}
          fullHeight
          disableCategories={['state']}
          typeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
          values={todos}
          onChange={setTodos}
          onFetchData={handleFetch.data}
          onFetchDefinition={getTypeDefinition}
          onFetchTodoWrapper={handleFetch.wrapper}
        />
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
