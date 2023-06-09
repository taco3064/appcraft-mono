import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import type { ButtonProps } from '@mui/material/Button';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { MenuItemProps } from '@mui/material/MenuItem';

enum BtnVariant {
  icon,
  menu,
  text,
}

export type CommonButtonVariant = keyof typeof BtnVariant;

interface BaseProps<
  T extends CommonButtonVariant,
  P = T extends 'text'
    ? Omit<ButtonProps, 'children' | 'startIcon'>
    : T extends 'menu'
    ? Omit<MenuItemProps, 'children'>
    : Omit<IconButtonProps, 'children'>
> {
  IconProps?: SvgIconProps;
  btnVariant: T;
  text: string;
  icon: typeof SvgIcon;
  props: P;
}

export type CommonGenericProps<T extends CommonButtonVariant> =
  BaseProps<T>['props'] &
    Pick<BaseProps<T>, 'IconProps' | 'btnVariant' | 'text' | 'icon'>;

export type CommonButtonProps =
  | CommonGenericProps<'text'>
  | CommonGenericProps<'icon'>
  | CommonGenericProps<'menu'>;
