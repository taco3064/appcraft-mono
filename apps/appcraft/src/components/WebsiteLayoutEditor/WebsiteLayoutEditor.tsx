import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import _set from 'lodash/set';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { PALETTES } from '@appcraft/themes';
import { useTheme } from '@mui/material/styles';

import { useFixedT } from '~appcraft/hooks';
import type { WebsiteLayoutEditorProps } from './WebsiteLayoutEditor.types';

export default function WebsiteLayoutEditor({
  action,
  palettes,
  value,
  onBack,
  onChange,
}: WebsiteLayoutEditorProps) {
  const [at, tt, pt, wt] = useFixedT('app', 'themes', 'pages', 'websites');
  const theme = useTheme();

  return (
    <>
      <CraftsmanStyle.WidgetAppBar
        action={action}
        {...(onBack && {
          BackButtonProps: {
            icon: <ArrowBackIcon />,
            text: at('btn-back'),
            onClick: () => onBack,
          },
        })}
      >
        <CraftsmanStyle.AutoBreakTypography
          primary={wt('ttl-mode-app')}
          primaryTypographyProps={{ whiteSpace: 'nowrap' }}
        />
      </CraftsmanStyle.WidgetAppBar>

      <List disablePadding style={{ background: 'inherit' }}>
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <TextField
                fullWidth
                select
                variant="outlined"
                size="small"
                label={at('lbl-theme')}
                value={value.theme}
                onChange={(e) =>
                  onChange({ ..._set(value, 'theme', e.target.value) })
                }
              >
                {Object.keys(PALETTES).map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {tt(`opt-theme-${opt.toLowerCase().replace(/_/g, '-')}`)}
                  </MenuItem>
                ))}

                {!palettes?.length ? (
                  <Divider />
                ) : (
                  palettes.map(({ _id: value, name }) => (
                    <MenuItem key={value} value={value}>
                      {name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <TextField
                fullWidth
                select
                variant="outlined"
                size="small"
                label={wt('lbl-max-width')}
                value={value.maxWidth}
                onChange={(e) =>
                  onChange({ ..._set(value, 'maxWidth', e.target.value) })
                }
              >
                {theme.breakpoints.keys.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {pt(`lbl-${opt}`)} ({theme.breakpoints.values[opt]}px)
                  </MenuItem>
                ))}
              </TextField>
            }
          />
        </ListItem>
      </List>
    </>
  );
}
