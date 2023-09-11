import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Button from '@mui/material/Button';
import { CraftsmanStyle, CraftedTodoEditor } from '@appcraft/craftsman';
import { useEffect, useImperativeHandle, useState } from 'react';
import type { MouseEventHandler } from 'react';

import { getTypeDefinition } from '~appcraft/services';
import { useCraftsmanFetch, useFixedT } from '~appcraft/hooks/common';
import type { TemplateTodoItemProps } from './TemplateTodoItem.types';

export default function TemplateTodoItem({
  CraftedTodoEditorProps,
  disabled: defaultDisabled = false,
  displayRef,
  label,
  value,
  onChange,
}: TemplateTodoItemProps) {
  const disabled = defaultDisabled || Boolean(!label?.trim());
  const handleFetch = useCraftsmanFetch();
  const [ct] = useFixedT('appcraft');
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<typeof value>();

  const handleClose: MouseEventHandler = (e) => {
    e.stopPropagation();
    setOpen(false);
    setEditing(false);
  };

  useImperativeHandle(displayRef, () => () => !disabled && setOpen(true), [
    disabled,
  ]);

  useEffect(() => {
    if (open) {
      setTodos(JSON.parse(JSON.stringify(value)));
    }
  }, [open, value]);

  return (
    <>
      <CraftsmanStyle.GapTypography
        variant="subtitle1"
        color={disabled ? 'text.secondary' : 'text.primary'}
      >
        <AssignmentOutlinedIcon color={disabled ? 'disabled' : 'secondary'} />

        {label}
      </CraftsmanStyle.GapTypography>

      <CraftsmanStyle.FlexDialog
        disableContentJustifyCenter
        disableContentGutter
        disableContentPadding
        fullWidth
        maxWidth="xs"
        direction="column"
        contentHeight={(theme) => `calc(100vh - ${theme.spacing(24)})`}
        title={ct('ttl-events')}
        open={open}
        onClose={handleClose}
        action={
          <>
            <Button onClick={handleClose}>{ct('btn-cancel')}</Button>

            <Button
              color="primary"
              disabled={editing}
              onClick={(e) => {
                handleClose(e);
                onChange(todos);
              }}
            >
              {ct('btn-confirm')}
            </Button>
          </>
        }
      >
        <CraftedTodoEditor
          {...CraftedTodoEditorProps}
          disableCategories={['props']}
          fullHeight
          variant="normal"
          typeFile={__WEBPACK_DEFINE__.TODO_TYPE_FILE}
          values={todos}
          onChange={setTodos}
          onEditToggle={setEditing}
          onFetchData={handleFetch.data}
          onFetchDefinition={getTypeDefinition}
          onFetchTodoWrapper={handleFetch.wrapper}
        />
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
