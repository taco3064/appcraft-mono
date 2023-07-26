import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { muiWidgets } from '../LazyMui';
import { useFixedT } from '~appcraft/hooks';
import type { WidgetTypeSelectProps } from './WidgetTypeSelect.types';

export default function WidgetTypeSelect(props: WidgetTypeSelectProps) {
  const [wt] = useFixedT('widgets');

  return (
    <TextField SelectProps={{ displayEmpty: true }} select {...props}>
      <MenuItem value="">&nbsp;</MenuItem>

      {muiWidgets.reduce((options, { category, widgets }) => {
        options.push(
          <ListItemButton key={category} disabled>
            <ListItemText
              primary={wt(`ttl-category-${category}`)}
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
