import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useTypeField } from './TypeItem.hooks';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  disableSelection = false,
  options,
  onDisplayItemClick,
}: Types.TypeItemProps) {
  const [TypeField, clickable] = useTypeField(options);

  const children = !TypeField ? null : (
    <>
      {!disableSelection && (
        <ListItemIcon>
          <Checkbox color="primary" />
        </ListItemIcon>
      )}

      <ListItemText
        disableTypography
        primary={<TypeField options={options} />}
      />
    </>
  );

  return !children ? null : clickable ? (
    <ListItemButton
      children={children}
      onClick={() => onDisplayItemClick(options)}
    />
  ) : (
    <ListItem children={children} />
  );
}
