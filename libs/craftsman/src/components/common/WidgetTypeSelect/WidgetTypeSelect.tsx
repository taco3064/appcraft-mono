import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { MUI_WIDGETS } from '@appcraft/widgets';
import type { ReactNode } from 'react';

import { useLocalesContext } from '../../../contexts';
import type { WidgetTypeSelectProps } from './WidgetTypeSelect.types';

export default function WidgetTypeSelect(props: WidgetTypeSelectProps) {
  const ct = useLocalesContext();

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
