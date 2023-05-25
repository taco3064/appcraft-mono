import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { TypeItem } from '../TypeItem';
import { useFixedT, usePropPath } from '../../contexts';
import { usePropertyRouter, useTypeItems } from '../../hooks';
import type { TypeListProps } from './TypeList.types';

export default function TypeList({
  disableSelection,
  superior,
  values,
  onPropPathChange,
}: TypeListProps) {
  const ct = useFixedT();
  const propPath = usePropPath();
  const { isModifiable, items, value, onChange } = useTypeItems(superior);

  const [breadcrumbs, { back: handleBack, to: handleTo }] = usePropertyRouter(
    { values, onPropPathChange },
    propPath
  );

  return (
    <List
      subheader={
        <ListSubheader
          component={Toolbar}
          variant="dense"
          sx={{
            background: 'inherit',
            gap: (theme) => theme.spacing(1),
            minHeight: 0,
          }}
        >
          {breadcrumbs.length > 0 && (
            <Tooltip title={ct('btn-back')}>
              <IconButton
                onClick={() => handleBack()}
                sx={{ margin: (theme) => theme.spacing(1, 0) }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          )}

          <Breadcrumbs separator="." style={{ marginRight: 'auto' }}>
            {breadcrumbs.map(({ name, isArrayElement, isLast }, i) =>
              isLast ? (
                <Typography
                  key={`${name}_${i}`}
                  variant="subtitle1"
                  color="secondary"
                >
                  {isArrayElement ? `[${name}]` : name}
                </Typography>
              ) : (
                <Link
                  key={`${name}_${i}`}
                  component="button"
                  underline="hover"
                  variant="subtitle1"
                  color="text.primary"
                  onClick={() => handleBack(i)}
                >
                  {isArrayElement ? `[${name}]` : name}
                </Link>
              )
            )}
          </Breadcrumbs>

          {breadcrumbs.length > 0 && isModifiable && (
            <Tooltip title={ct('btn-add-prop')}>
              <IconButton
                size="small"
                onClick={() =>
                  onChange(
                    superior.type === 'arrayOf'
                      ? [...((value as []) || []), null]
                      : {
                          ...value,
                          [`key_${Object.keys(value || {}).length}`]: null,
                        }
                  )
                }
              >
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
          )}
        </ListSubheader>
      }
    >
      {items.map(({ key, options, onItemRemove }) => (
        <TypeItem
          {...{ key, disableSelection, options, onItemRemove }}
          onDisplayItemClick={handleTo}
        />
      ))}
    </List>
  );
}
