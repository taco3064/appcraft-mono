import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import * as Style from '~appcraft/styles';
import NAVS from '~appcraft/assets/json/navs.json';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './MenuDrawer.types';

export default function MenuDrawer({
  open,
  onClose,
  ...props
}: Types.MenuDrawerProps) {
  const [nt] = useFixedT('nav');

  return (
    <Style.SizedDrawer
      {...props}
      maxWidth="xs"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <List
        subheader={
          <ListSubheader
            component={Toolbar}
            sx={(theme) => ({ paddingX: `${theme.spacing(2)} !important` })}
          >
            <Typography variant="h5" color="primary" marginRight="auto" gap={2}>
              <Style.SquareLogo
                sx={(theme) => ({ fontSize: theme.spacing(5) })}
              />
              Appcraft
            </Typography>

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
            component={Style.Link}
            onClick={(e) => onClose(e, 'escapeKeyDown')}
          >
            <Style.SizedListItemIcon>
              <Icon
                color="info"
                fontSize="large"
                baseClassName="material-icons-outlined"
              >
                {icon}
              </Icon>
            </Style.SizedListItemIcon>

            <ListItemText
              primary={nt(title)}
              secondary={nt(description)}
              primaryTypographyProps={{
                variant: 'subtitle1',
                fontWeight: 'bolder',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Style.SizedDrawer>
  );
}
