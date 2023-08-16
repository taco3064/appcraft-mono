import CheckIcon from '@mui/icons-material/Check';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import UndoIcon from '@mui/icons-material/Undo';
import type { FormEventHandler } from 'react';

import { IconTipButton, TypeItemAction } from '../../../styles';
import { useEditorContext, useLocalesContext } from '../../../contexts';
import type { TypeItemNamingProps } from './TypeItemNaming.types';

export default function TypeItemNaming({
  open,
  propName,
  selectable,
  onClose,
  onRename,
}: TypeItemNamingProps) {
  const ct = useLocalesContext();
  const { collectionPath, values, overrideNamingProps } = useEditorContext();
  const { typeFile, typeName } = values;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formdata = new FormData(e.currentTarget);

    e.preventDefault();

    if (onRename?.(formdata.get('propName') as string)) {
      onClose();
    }
  };

  return (
    <ListItem component="form" onSubmit={handleSubmit}>
      {selectable && <ListItemIcon />}

      <ListItemText
        disableTypography
        primary={
          open && (
            <TextField
              {...overrideNamingProps?.({
                propPath: collectionPath,
                typeFile,
                typeName,
              })}
              autoFocus
              fullWidth
              required
              size="small"
              variant="outlined"
              name="propName"
              defaultValue={propName}
              label={ct('lbl-prop-naming', {
                name: propName || 'empty',
              })}
            />
          )
        }
      />

      <TypeItemAction>
        <IconTipButton title={ct('btn-cancel')} onClick={onClose}>
          <UndoIcon />
        </IconTipButton>

        <IconTipButton type="submit" color="primary" title={ct('btn-confirm')}>
          <CheckIcon />
        </IconTipButton>
      </TypeItemAction>
    </ListItem>
  );
}
