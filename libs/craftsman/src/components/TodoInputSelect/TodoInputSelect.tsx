import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import _toPath from 'lodash/toPath';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { Suspense, useState } from 'react';
import type { FuncProp, StructureProp } from '@appcraft/types';

import * as Style from '../../styles';
import { useLazyDefinition } from '../../hooks';
import { useLocalesContext } from '../../contexts';
import type * as Types from './TodoInputSelect.types';

const getDefOptions: Types.GetDefOptionsFn = ({ type, options }) => {
  if (type === 'func') {
    return options?.params || [];
  } else if (type === 'exact') {
    return Object.values(options || {});
  }

  return [];
};

export default function TodoInputSelect({
  disabled = false,
  label,
  source,
  value,
  onChange,
  onFetchDefinition,
}: Types.TodoInputSelectProps) {
  const { typeFile, typeName, mixedTypes, collectionPath: todoPath } = source;
  const error = Boolean(!value);

  const ct = useLocalesContext();

  const [menu, setMenu] = useState<Types.MenuState>({
    open: false,
    path: '',
  });

  const LazyAdornmentTextField = useLazyDefinition<
    Types.LazyAdornmentTextFieldProps,
    FuncProp | StructureProp
  >(
    {
      typeFile,
      typeName,
      mixedTypes,
      collectionPath: !menu.path
        ? todoPath
        : ExhibitorUtil.getPropPath([todoPath as string, 'params', menu.path]),
    },
    onFetchDefinition,
    ({ fetchData, superiorPath, onActive, onBack, ...props }) => (
      <Style.AdornmentTextField
        {...props}
        {...(!fetchData && {
          error: true,
          helperText: ct('msg-no-event-inputs'),
        })}
      >
        <Style.ListToolbar color="inherit">
          <IconButton
            disabled={!superiorPath}
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Style.ListToolbar>

        {fetchData &&
          getDefOptions(fetchData).map(({ propName, type }) => (
            <MenuItem
              key={propName}
              value={ExhibitorUtil.getPropPath([
                superiorPath,
                propName as string,
              ])}
            >
              <ListItemText
                primary={propName}
                secondary={type}
                secondaryTypographyProps={{ variant: 'caption' }}
              />

              {/^(arrayOf|exact|object|objectOf)$/.test(type) && (
                <Style.TypeItemAction>
                  <IconButton onClick={() => onActive(propName as string)}>
                    <ArrowForwardIcon />
                  </IconButton>
                </Style.TypeItemAction>
              )}
            </MenuItem>
          ))}
      </Style.AdornmentTextField>
    )
  );

  return (
    <Suspense fallback={<LinearProgress />}>
      <LazyAdornmentTextField
        {...{ disabled, error, label, value }}
        SelectProps={{
          MenuProps: { MenuListProps: { style: { background: 'inherit' } } },
          open: menu.open,
          onOpen: () => setMenu({ ...menu, open: true }),
          onClose: () => setMenu({ ...menu, open: false }),
        }}
        fullWidth
        required
        select
        size="small"
        variant="outlined"
        helperText={error ? ct('msg-required') : undefined}
        icon={InfoOutlinedIcon}
        superiorPath={menu.path}
        onChange={(e) => onChange(e.target.value)}
        onActive={(propName) =>
          setMenu({
            open: true,
            path: ExhibitorUtil.getPropPath([menu.path, propName]),
          })
        }
        onBack={() =>
          setMenu({
            open: true,
            path: ExhibitorUtil.getPropPath(_toPath(menu.path).slice(0, -1)),
          })
        }
      />
    </Suspense>
  );
}
