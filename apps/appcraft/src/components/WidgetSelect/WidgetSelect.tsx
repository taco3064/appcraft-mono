import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { MUI_WIDGETS } from '@appcraft/types';

import { useFixedT } from '~appcraft/hooks';
import type { WidgetSelectProps } from './WidgetSelect.types';

export default function WidgetSelect(props: WidgetSelectProps) {
  const [wt] = useFixedT('widgets');

  return (
    <TextField SelectProps={{ displayEmpty: true }} select {...props}>
      <MenuItem value="">&nbsp;</MenuItem>

      {MUI_WIDGETS.widgets.reduce((options, { category, components }) => {
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

          ...components.map(({ id }) => (
            <MenuItem
              key={id}
              value={id}
              sx={(theme) => ({ paddingLeft: theme.spacing(2) })}
            >
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle1',
                  color: 'text.primary',
                  lineHeight: 1.5,
                  style: { margin: 0 },
                }}
                primary={id}
              />
            </MenuItem>
          ))
        );

        return options;
      }, [])}
    </TextField>
  );
}
