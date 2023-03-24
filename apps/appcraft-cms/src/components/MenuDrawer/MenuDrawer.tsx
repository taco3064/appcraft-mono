import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import * as Styles from '~appcraft-cms/styles';
import NAVS from '~appcraft-cms/assets/json/navs.json';
import type * as Types from './MenuDrawer.types';
import { useFixedT } from '~appcraft-cms/hooks';

export default function MenuDrawer({
  open,
  onClose,
  ...props
}: Types.MenuDrawerProps) {
  const [nt] = useFixedT('nav');

  return (
    <Styles.SizedDrawer
      {...props}
      maxWidth="xs"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <List
        subheader={
          <ListSubheader component={Styles.GapToolbar}>
            <Styles.IconTypograph
              variant="h5"
              color="primary"
              icon={<AutoAwesomeMosaicIcon />}
              style={{ marginRight: 'auto' }}
            >
              Appcraft
            </Styles.IconTypograph>

            <IconButton onClick={(e) => onClose(e, 'escapeKeyDown')}>
              <ChevronLeftIcon />
            </IconButton>
          </ListSubheader>
        }
      >
        <Divider />

        {NAVS.map(({ title, description, icon, url }) => (
          <ListItemButton
            key={url}
            disableGap
            href={url}
            component={Styles.Link}
            onClick={(e) => onClose(e, 'escapeKeyDown')}
          >
            <Styles.SizedListItemIcon>
              <Icon
                color="info"
                fontSize="large"
                baseClassName="material-icons-outlined"
              >
                {icon}
              </Icon>
            </Styles.SizedListItemIcon>

            <ListItemText
              primaryTypographyProps={{
                variant: 'subtitle1',
                fontWeight: 'bolder',
              }}
              primary={nt(title)}
              secondary={nt(description)}
            />
          </ListItemButton>
        ))}
      </List>
    </Styles.SizedDrawer>
  );
}
