import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Button from '@mui/material/Button';
import { CraftsmanStyle, CraftedTodoEditor } from '@appcraft/craftsman';
import { useState } from 'react';

import { CommonButton } from '~appcraft/components/common';
import { getTypeDefinition } from '~appcraft/services';
import { useCraftsmanFetch, useFixedT } from '~appcraft/hooks';
import { useCraftsmanOverride } from '~appcraft/contexts';
import type * as Types from './ReadyTodoEditor.types';
import type { PageData } from '~appcraft/hooks';

export default function ReadyTodoEditor({
  layouts,
  value,
  onConfirm,
}: Types.ReadyTodoEditorProps) {
  const [at, pt] = useFixedT('app', 'pages');
  const [open, setOpen] = useState(false);
  const handleFetch = useCraftsmanFetch();
  const override = useCraftsmanOverride({ layouts });

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
          onFetchWrapper={handleFetch.wrapper}
        />
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
