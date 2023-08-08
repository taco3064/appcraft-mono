import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import type { ReactNode } from 'react';

import { MUI_WIDGETS } from '../../../widgets';
import type { WidgetTypeSelectProps } from './WidgetTypeSelect.types';

export default function WidgetTypeSelect({
  ct,
  ...props
}: WidgetTypeSelectProps) {
  return (
    <TextField SelectProps={{ displayEmpty: true }} select {...props}>
      <MenuItem value="">&nbsp;</MenuItem>

      {MUI_WIDGETS.reduce<ReactNode[]>((options, { category, widgets }) => {
        options.push(
          <ListItemButton key={category} disabled>
            <ListItemText
              primary={ct(`ttl-category-${category}`)}
              primaryTypographyProps={{
                variant: 'caption',
                color: 'primary',
              }}
            />
          </ListItemButton>,

          ...widgets.map(({ typeName }) => (
            <MenuItem
              key={typeName}
              value={typeName}
              sx={(theme) => ({ paddingLeft: theme.spacing(2) })}
            >
              <ListItemText
                primary={typeName}
                primaryTypographyProps={{
                  variant: 'subtitle1',
                  color: 'text.primary',
                  lineHeight: 1.5,
                  style: { margin: 0 },
                }}
              />
            </MenuItem>
          ))
        );

        return options;
      }, [])}
    </TextField>
  );
}
