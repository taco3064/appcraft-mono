import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Button from '@mui/material/Button';
import { useImperativeHandle, useState } from 'react';
import type { MouseEventHandler } from 'react';

import { FlexDialog, GapTypography } from '../../styles';
import type { TodoItemProps } from './TodoItem.types';

export default function TodoItem({
  ct,
  disabled: defaultDisabled = false,
  displayRef,
  label,
  value,
  renderTodoEditor,
  onChange,
}: TodoItemProps) {
  const disabled = defaultDisabled || Boolean(!label?.trim());
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState(value || {});

  const handleClose: MouseEventHandler = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  useImperativeHandle(displayRef, () => () => !disabled && setOpen(true), [
    disabled,
  ]);

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
        {renderTodoEditor({ values: todos, onChange: setTodos })}
      </FlexDialog>
    </>
  );
}
