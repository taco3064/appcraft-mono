import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

import { GapToolbar, IconTypograph, SizedDrawer } from '~demo/styles';
import type * as Types from './MenuDrawer.types';

export default function MenuDrawer({
  open,
  onClose,
  ...props
}: Types.MenuDrawerProps) {
  return (
    <SizedDrawer
      {...props}
      maxWidth="xs"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <List
        subheader={
          <ListSubheader component={GapToolbar}>
            <IconTypograph
              variant="h5"
              color="secondary"
              icon={<AutoAwesomeMosaicIcon />}
              style={{ marginRight: 'auto' }}
            >
              Appcraft
            </IconTypograph>

            <IconButton onClick={(e) => onClose(e, 'escapeKeyDown')}>
              <ChevronLeftIcon />
            </IconButton>
          </ListSubheader>
        }
      >
        <Divider />
      </List>
    </SizedDrawer>
  );
}
