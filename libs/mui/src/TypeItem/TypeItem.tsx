import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useTypeField } from './TypeItem.hooks';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  InputStyles,
  options,
  onDisplayItemClick,
}: Types.TypeItemProps) {
  const [TypeField, clickable] = useTypeField(options);

  const children = !TypeField ? null : (
    <>
      <ListItemIcon>[]</ListItemIcon>

      <ListItemText
        disableTypography
        primary={<TypeField {...{ InputStyles, options }} />}
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
