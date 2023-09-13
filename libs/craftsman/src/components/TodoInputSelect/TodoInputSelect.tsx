import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import _toPath from 'lodash/toPath';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { Suspense, useState } from 'react';
import type { FuncProp, StructureProp } from '@appcraft/types';

import * as Style from '../../styles';
import { Breadcrumbs } from '../common';
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
    path: ExhibitorUtil.getPropPath(_toPath(value).slice(0, -1)),
  });

  const handleBack = (index?: number) => {
    const paths = _toPath(menu.path);

    setMenu({
      open: true,
      path: ExhibitorUtil.getPropPath(
        paths.slice(0, typeof index === 'number' ? index : -1)
      ),
    });
  };

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
    ({ fetchData, children, superiorPath, onActive, ...props }) => (
      <Style.AdornmentTextField {...props}>
        {children}

        {fetchData &&
          getDefOptions(fetchData).map(({ options, propName, type }) =>
            type === 'func' ||
            (type === 'instanceOf' && options !== 'Date') ? null : (
              <MenuItem
                key={propName}
                sx={{ '& > .action': { display: 'flex !important' } }}
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

                {/^(exact|object|objectOf)$/.test(type) && (
                  <Style.TypeItemAction
                    className="action"
                    style={{ display: 'none' }}
                  >
                    <IconButton onClick={() => onActive(propName as string)}>
                      <ArrowForwardIcon />
                    </IconButton>
                  </Style.TypeItemAction>
                )}
              </MenuItem>
            )
          )}
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
          onClose: () =>
            setMenu({
              open: false,
              path: ExhibitorUtil.getPropPath(_toPath(value).slice(0, -1)),
            }),
        }}
        fullWidth
        required
        select
        size="small"
        variant="outlined"
        helperText={error ? ct('msg-required') : undefined}
        icon={MenuOpenIcon}
        superiorPath={menu.path}
        onActive={(propName) =>
          setMenu({
            open: true,
            path: ExhibitorUtil.getPropPath([menu.path, propName]),
          })
        }
        onChange={(e) => {
          const paths = _toPath(e.target.value);

          onChange(e.target.value);

          setMenu({
            open: false,
            path: ExhibitorUtil.getPropPath(paths.slice(0, -1)),
          });
        }}
      >
        <Style.ListToolbar
          muiSkipListHighlight
          color="inherit"
          style={{ display: menu.path ? 'flex' : 'none' }}
        >
          <Style.IconTipButton
            title={ct('btn-back')}
            onClick={() => handleBack()}
          >
            <ArrowBackIcon />
          </Style.IconTipButton>

          <Breadcrumbs
            TopProps={{ text: ct('txt-top'), onClick: () => handleBack(0) }}
            collapsedTitle={ct('ttl-props')}
            separator="."
            maxItems={2}
            style={{ marginRight: 'auto' }}
          >
            {_toPath(menu.path).map((name, i, arr) => (
              <Style.Breadcrumb
                key={`breadcrumb_${i}`}
                brcVariant={i === arr.length - 1 ? 'text' : 'link'}
                onClick={() => handleBack(i + 1)}
              >
                {/^\d+$/.test(name) ? `[${name}]` : name}
              </Style.Breadcrumb>
            ))}
          </Breadcrumbs>
        </Style.ListToolbar>
      </LazyAdornmentTextField>
    </Suspense>
  );
}
