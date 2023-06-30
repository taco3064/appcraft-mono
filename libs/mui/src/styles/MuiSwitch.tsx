import Switch, { SwitchProps } from '@mui/material/Switch';
import { withStyles } from 'tss-react/mui';

export const WidgetNodeSwitch = (() => {
  interface WidgetNodeSwitchProps
    extends Omit<SwitchProps, 'defaultChecked' | 'checked' | 'onChange'> {
    value: 'nodes' | 'events';
    onChange: (value: 'nodes' | 'events') => void;
  }

  return withStyles(
    ({ value, onChange, ...props }: WidgetNodeSwitchProps) => (
      <Switch
        {...props}
        checked={value === 'events'}
        onChange={(e) => onChange(e.target.checked ? 'events' : 'nodes')}
      />
    ),
    (theme, { value }) => ({
      root: {
        width: 60,
        height: 34,
        padding: 7,
        margin: 1,
      },
      switchBase: {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
      },
      checked: {
        color: '#fff',
        transform: 'translateX(22px)',
      },
      track: {
        opacity: 1,
        backgroundColor: theme.palette.action.disabled,
        borderRadius: 20 / 2,
      },
      thumb: {
        backgroundColor:
          theme.palette[value === 'events' ? 'success' : 'info'].dark,
        width: 32,
        height: 32,

        ...({
          '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.text.primary
            )}" d="${
              value === 'events'
                ? 'M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z'
                : 'M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3h7zM7 9H4V5h3v4zm10 6h3v4h-3v-4zm0-10h3v4h-3V5z'
            }"/></svg>')`,
          },
        } as object),
      },
    }),
    { name: 'WidgetNodeSwitch' }
  );
})();
