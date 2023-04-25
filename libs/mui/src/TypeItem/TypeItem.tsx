import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

import { useTypeField } from './TypeItem.hooks';
import * as Fields from '../TypeFields';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  disableSelection = false,
  options,
  onDisplayItemClick,
}: Types.TypeItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const category = useTypeField(options);

  const selection = disableSelection ? null : (
    <ListItemIcon>
      <Checkbox color="primary" />
    </ListItemIcon>
  );

  switch (category) {
    case 'Display':
      return (
        <ListItemButton onClick={() => onDisplayItemClick(options)}>
          {selection}

          <ListItemText
            disableTypography
            primary={
              <Fields.DisplayField
                options={options as Fields.DisplayFieldProps['options']}
              />
            }
          />
        </ListItemButton>
      );

    case 'Pure':
      return (
        <ListItem>
          {selection}

          <ListItemText
            disableTypography
            primary={
              <Fields.PureField
                options={options as Fields.PureFieldProps['options']}
              />
            }
          />
        </ListItem>
      );

    case 'Mixed': {
      const opts = options as Fields.MixedFieldProps['options'];

      return (
        <>
          <ListItemButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            {selection}

            <ListItemText
              disableTypography
              primary={<Fields.MixedField options={opts} />}
            />
          </ListItemButton>

          <Menu
            PaperProps={{ elevation: 0 }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={() => setAnchorEl(null)}
          >
            {opts.options
              ?.sort(({ type: t1, text: p1 }, { type: t2, text: p2 }) => {
                const s1 = `${t1}:${p1}`;
                const s2 = `${t2}:${p2}`;

                return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
              })
              .map(({ type, text }, i) => (
                <MenuItem key={text} value={text}>
                  <ListItemText
                    primaryTypographyProps={{
                      fontWeight: 'bolder',
                      textTransform: 'capitalize',
                    }}
                    primary={type}
                    secondary={text.replace(/import\s*\(.*?\)\s*;?\./g, '')}
                  />
                </MenuItem>
              ))}
          </Menu>
        </>
      );
    }
    default:
      return null;
  }
}
