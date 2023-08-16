import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Button from '@mui/material/Button';
import { useEffect, useImperativeHandle, useState } from 'react';
import type { MouseEventHandler } from 'react';

import { FlexDialog, GapTypography } from '../../styles';
import { useLocalesContext } from '../../contexts';
import type { TodoItemProps } from './TodoItem.types';

export default function TodoItem({
  disabled: defaultDisabled = false,
  displayRef,
  label,
  value,
  renderTodoEditor,
  onChange,
}: TodoItemProps) {
  const ct = useLocalesContext();
  const disabled = defaultDisabled || Boolean(!label?.trim());
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
      <GapTypography
        variant="subtitle1"
        color={disabled ? 'text.secondary' : 'text.primary'}
      >
        <AssignmentOutlinedIcon color={disabled ? 'disabled' : 'secondary'} />

        {label}
      </GapTypography>

      <FlexDialog
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
        {renderTodoEditor({
          values: todos,
          onChange: setTodos,
          onEditToggle: setEditing,
        })}
      </FlexDialog>
    </>
  );
}
