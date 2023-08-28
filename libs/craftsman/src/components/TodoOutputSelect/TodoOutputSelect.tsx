import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LinearProgress from '@mui/material/LinearProgress';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import TextField from '@mui/material/TextField';
import _intersection from 'lodash/intersection';
import _isPlainObject from 'lodash/isPlainObject';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { Suspense } from 'react';
import type { ComponentProps } from 'react';

import { splitProps } from '../../utils';
import { useLazyTodoOutputs } from '../../hooks';
import { useLocalesContext } from '../../contexts';
import type * as Types from './TodoOutputSelect.types';

const getOutputOptions: Types.GetOutputOptions = (todos, outputs) =>
  outputs.reduce<Types.OutputOption[]>(
    (result, { todo: todoid, alias = todoid, output }) => {
      const { [todoid]: todo } = todos;

      if (todo) {
        const { category, description } = todo;
        const properties = splitProps(output, { ignoreSplitArray: true });

        if (category !== 'iterate') {
          result.push({
            value: alias,
            description: `${description || alias} (${category})`,
          });

          Object.keys(properties).forEach((path) =>
            result.push({
              value: `${alias}.${path}`,
              description: `${description || alias} (${category})`,
            })
          );
        } else {
          const { source } = todo;

          const { target } = !source
            ? { target: null }
            : ExhibitorUtil.getVariableOutput(
                { target: { mode: 'extract', initial: source } },
                { event: [], outputs }
              );

          if (Array.isArray(target) || _isPlainObject(target)) {
            const paths = _intersection(
              ...(Array.isArray(target)
                ? target
                : Object.values(target || {})
              ).map((item) => Object.keys(item))
            );

            paths.forEach((path) =>
              result.push({
                value: `$el_${alias}.${path}`,
                description: `${description || alias} (${category})`,
              })
            );
          }
        }
      }

      return result;
    },
    []
  );

export default function TodoOutputSelect({
  edges,
  todos,
  todoid,
  disabled = false,
  label,
  value,
  onChange,
  onFetchData,
  onFetchTodoWrapper,
}: Types.TodoOutputSelectProps) {
  const ct = useLocalesContext();

  const LazyTextField = useLazyTodoOutputs<ComponentProps<typeof TextField>>(
    todos,
    edges,
    todoid,
    { onFetchData, onFetchTodoWrapper },
    ({ children, fetchData, ...props }) => (
      <TextField {...props}>
        {children}

        {getOutputOptions(todos, fetchData || []).map(
          ({ value, description }) => {
            const isComplete = !value.includes('.');

            return (
              <MenuItem
                key={value}
                value={value}
                sx={{ '& > .icon': { display: 'inline-flex !important' } }}
              >
                <ListItemIcon className="icon" style={{ display: 'none' }}>
                  {isComplete ? (
                    <FolderOutlinedIcon />
                  ) : (
                    <LabelImportantIcon fontSize="small" />
                  )}
                </ListItemIcon>

                <ListItemText
                  primary={value}
                  secondary={description}
                  primaryTypographyProps={{
                    variant: isComplete ? 'subtitle1' : 'subtitle2',
                    color: isComplete ? 'primary' : 'text.primary',
                    fontWeight: isComplete ? 'bolder' : 'normal',
                  }}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    color: 'text.secondary',
                  }}
                />
              </MenuItem>
            );
          }
        )}
      </TextField>
    )
  );

  return (
    <Suspense fallback={<LinearProgress />}>
      {value}
      <LazyTextField
        {...{ disabled, label, value }}
        SelectProps={{ displayEmpty: true }}
        fullWidth
        select
        variant="outlined"
        size="small"
        error={Boolean(!value)}
        helperText={!value && ct('msg-required')}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NavigationOutlinedIcon
                color="disabled"
                fontSize="small"
                style={{ transform: 'rotate(90deg)' }}
              />
            </InputAdornment>
          ),
        }}
      >
        <MenuItem value="">&nbsp;</MenuItem>
      </LazyTextField>
    </Suspense>
  );
}
