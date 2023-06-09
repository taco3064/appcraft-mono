import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { muiWidgets } from '../common';
import { useFixedT } from '~appcraft/hooks';
import type { WidgetSelectProps } from './WidgetSelect.types';

export default function WidgetSelect(props: WidgetSelectProps) {
  const [wt] = useFixedT('widgets');

  return (
    <TextField SelectProps={{ displayEmpty: true }} select {...props}>
      <MenuItem value="">&nbsp;</MenuItem>

      {muiWidgets.reduce((options, { category, widgets }) => {
        options.push(
          <ListItemButton key={category} disabled>
            <ListItemText
              primaryTypographyProps={{
                variant: 'caption',
                color: 'primary',
              }}
              primary={wt(`ttl-category-${category}`)}
            />
          </ListItemButton>,

          ...widgets.map(({ typeName }) => (
            <MenuItem
              key={typeName}
              value={typeName}
              sx={(theme) => ({ paddingLeft: theme.spacing(2) })}
            >
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle1',
                  color: 'text.primary',
                  lineHeight: 1.5,
                  style: { margin: 0 },
                }}
                primary={typeName}
              />
            </MenuItem>
          ))
        );

        return options;
      }, [])}
    </TextField>
  );
}
