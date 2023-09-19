import ReactDomServer from 'react-dom/server';
import Switch from '@mui/material/Switch';
import _get from 'lodash/get';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiSwitch.types';

export const IconSwitch = (<V extends string>() =>
  withStyles(
    forwardRef<HTMLButtonElement, Types.IconSwitchProps<V>>(
      ({ options, value, onChange, ...props }, ref) => {
        const keys = Object.keys(options) as V[];

        return (
          <Switch
            {...props}
            ref={ref}
            checked={value === keys[1]}
            onChange={(e) => onChange(keys[e.target.checked ? 1 : 0])}
          />
        );
      }
    ),
    (theme, { disabled = false, options, value }) => {
      const opts = Object.entries(options) as [V, Types.IconOptions][];
      const parser = new DOMParser();
      const serializer = new XMLSerializer();

      const docs = opts.reduce((result, [key, { icon: Icon }]) => {
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

        return { ...result, [key]: svg };
      }, {} as Record<V, Document>);

      const color = _get(theme.palette, [options[value]?.color as string]);

      return {
        root: {
          width: 60,
          height: theme.spacing(4),
          padding: theme.spacing(1),
        },
        disabled: {
          background: `linear-gradient(to bottom right, ${theme.palette.action.disabled}, ${theme.palette.text.disabled}) !important`,
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
          width: theme.spacing(4),
          height: theme.spacing(4),

          background: `linear-gradient(to bottom right, ${
            color?.main || theme.palette.grey['500']
          }, ${color?.dark || theme.palette.grey['800']})`,

          transition: theme.transitions.create('background', {
            easing: theme.transitions.easing.sharp,
            duration:
              theme.transitions.duration[
                value === opts[1][0] ? 'enteringScreen' : 'leavingScreen'
              ],
          }),
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
              docs[value]
            )}')`,
          } as never,
        },
      };
    },
    { name: 'IconSwitch' }
  ))();
