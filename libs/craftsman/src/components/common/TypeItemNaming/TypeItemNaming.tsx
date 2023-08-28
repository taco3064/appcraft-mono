import CheckIcon from '@mui/icons-material/Check';
import LinearProgress from '@mui/material/LinearProgress';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import UndoIcon from '@mui/icons-material/Undo';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { Suspense, lazy, useMemo, useRef } from 'react';
import type { ComponentProps, FormEventHandler } from 'react';

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
  const { typeFile, typeName, props } = values;
  const ref = useRef({ typeFile, typeName, overrideNamingProps });

  const LazyTextField = useMemo(
    () =>
      lazy(async () => {
        const { typeFile, typeName, overrideNamingProps } = ref.current;

        const override = await overrideNamingProps?.({
          propPath: collectionPath,
          typeFile,
          typeName,
          values: ExhibitorUtil.getProps(props),
        });

        return {
          default: (props: ComponentProps<typeof TextField>) => (
            <TextField {...props} {...override} />
          ),
        };
      }),
    [collectionPath, props]
  );

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
            <Suspense fallback={<LinearProgress />}>
              <LazyTextField
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
            </Suspense>
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
