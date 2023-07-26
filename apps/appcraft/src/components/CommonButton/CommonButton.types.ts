import type { ButtonProps } from '@mui/material/Button';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { MenuItemProps } from '@mui/material/MenuItem';
import type { ReactNode } from 'react';

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
  btnVariant: T;
  text: string;
  icon: ReactNode;
  props: P;
}

export type CommonGenericProps<T extends CommonButtonVariant> =
  BaseProps<T>['props'] & Pick<BaseProps<T>, 'btnVariant' | 'text' | 'icon'>;

export type CommonButtonProps =
  | CommonGenericProps<'text'>
  | CommonGenericProps<'icon'>
  | CommonGenericProps<'menu'>;
