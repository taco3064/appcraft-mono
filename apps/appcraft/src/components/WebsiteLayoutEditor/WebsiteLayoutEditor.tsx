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
import type * as Types from './WebsiteLayoutEditor.types';

//* Methods
const getPageOptions: Types.GetPageOptionsFn = (pages, superior = '') =>
  pages.reduce((result, { id, subTitle, pathname, routes }) => {
    const $pathname = `${superior}${pathname}`;

    result.push(
      {
        value: id,
        primary: subTitle,
        secondary: $pathname,
      },
      ...(!Array.isArray(routes) ? [] : getPageOptions(routes, $pathname))
    );

    return result;
  }, []);

//* Components
export default function WebsiteLayoutEditor({
  action,
  palettes,
  value,
  onBack,
  onChange,
}: Types.WebsiteLayoutEditorProps) {
  const [at, tt, pt, wt] = useFixedT('app', 'themes', 'pages', 'websites');
  const pages = getPageOptions(value.pages);
  const theme = useTheme();

  return (
    <>
      <CraftsmanStyle.WidgetAppBar
        action={action}
        {...(onBack && {
          BackButtonProps: {
            icon: <ArrowBackIcon />,
            text: at('btn-back'),
            onClick: () => onBack(),
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

        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <TextField
                fullWidth
                select
                variant="outlined"
                size="small"
                label={wt('lbl-nav-anchor')}
                value={value.navAnchor}
                onChange={(e) =>
                  onChange({ ..._set(value, 'navAnchor', e.target.value) })
                }
              >
                <MenuItem value="top">{wt('opt-nav-top')}</MenuItem>
                <MenuItem value="left">{wt('opt-nav-left')}</MenuItem>
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
                name="homeid"
                label={wt('lbl-home-page')}
                value={value.homeid}
                onChange={(e) =>
                  onChange({ ..._set(value, 'homeid', e.target.value) })
                }
              >
                {pages.map(({ value, primary, secondary }) => (
                  <MenuItem key={value} value={value}>
                    <ListItemText
                      {...{ primary, secondary }}
                      primaryTypographyProps={{
                        variant: 'subtitle1',
                        color: 'text.primary',
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption',
                        color: 'text.secondary',
                      }}
                    />
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
