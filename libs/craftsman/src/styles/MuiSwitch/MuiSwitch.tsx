import ReactDomServer from 'react-dom/server';
import Switch from '@mui/material/Switch';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiSwitch.types';

export const IconSwitch = (<T extends string, F extends string>() =>
  withStyles(
    forwardRef<HTMLButtonElement, Types.IconSwitchProps<T, F>>(
      ({ colors, icons, value, onChange, ...props }, ref) => {
        const keys = Object.keys(icons);

        return (
          <Switch
            {...props}
            ref={ref}
            checked={value === keys[1]}
            onChange={(e) => onChange(keys[e.target.checked ? 1 : 0] as T | F)}
          />
        );
      }
    ),
    (theme, { disabled = false, colors, icons, value }) => {
      const keys = Object.keys(icons);
      const parser = new DOMParser();
      const serializer = new XMLSerializer();

      const docs = (
        Object.entries(icons) as [T | F, Types.SwitchIcon][]
      ).reduce((result, [key, Icon]) => {
        const doc = parser.parseFromString(
          ReactDomServer.renderToString(<Icon />),
          'image/svg+xml'
        );

        const svg = doc.documentElement;

        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        svg
          .querySelectorAll('path')
          .forEach((path) =>
            path.setAttribute(
              'fill',
              encodeURIComponent(theme.palette.text.secondary)
            )
          );

        return { ...result, [key]: doc };
      }, {} as Record<keyof typeof icons, Document>);

      const color = disabled
        ? {
            main: theme.palette.action.disabled,
            dark: theme.palette.text.disabled,
          }
        : theme.palette[
            colors?.[value] || (value === keys[1] ? 'success' : 'info')
          ];

      return {
        root: {
          width: 60,
          height: theme.spacing(4),
          padding: theme.spacing(1),
          transform: 'translateY(4px)',
        },
        switchBase: {
          padding: 0,
          transform: 'translateX(6px)',
        },
        checked: {
          color: '#fff',
          transform: 'translateX(22px)',
        },
        track: {
          opacity: 1,
          background: theme.palette.divider,
          borderRadius: 20 / 2,
        },
        thumb: {
          background: `linear-gradient(to bottom right, ${color.main}, ${color.dark})`,
          width: theme.spacing(4),
          height: theme.spacing(4),

          '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,${serializer.serializeToString(
              docs[value].documentElement
            )}')`,
          } as never,
        },
      };
    },
    { name: 'IconSwitch' }
  ))();
