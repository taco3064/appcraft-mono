import _set from 'lodash/set';
import { useEffect, useMemo, useReducer, useRef, useTransition } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getEventHandler } from '../../../utils';
import type * as Types from './useStateReducer.types';
import type { PropsChangeHandler, WidgetMap } from '../../../utils';

function reducer(
  states: Types.ReducerState,
  action: Types.ReducerAction | Types.ReducerAction[] | WidgetMap
) {
  if (!(action instanceof Map)) {
    return (Array.isArray(action) ? action : [action]).reduce(
      (result, { id, values }) => {
        Object.entries(values).forEach(([propPath, value]) =>
          _set(result, [id, propPath, 'value'], value)
        );

        return result;
      },
      { ...states }
    );
  }

  return Array.from(action.values()).reduce<Types.ReducerState>(
    (result, { id, state }) => {
      const acc: Types.ReducerState[string] = {};

      Object.entries(state || {}).forEach(([category, $state]) =>
        Object.entries($state).forEach(([stateKey, opts]) => {
          acc[stateKey] = {
            category: category as Appcraft.StateCategory,
            options: opts,
            value: opts.defaultValue,
            propPath: stateKey.replace(
              new RegExp(`(.*\\.${category}|^${category})\\.`),
              ''
            ),
          };
        })
      );

      return { ...result, [id]: acc };
    },
    {}
  );
}

export const useStateReducer: Types.StateReducerHook = (
  templates, //* Map Key: Configurate ID
  options,
  { onReady, ...readyOptions }
) => {
  const [, startTransition] = useTransition();
  const [states, dispatch] = useReducer(reducer, {});

  const handlePropsChange: PropsChangeHandler = (e) =>
    dispatch(
      Object.entries(e).map(([template, values]) => ({
        id: templates.get(template)?.id as string,
        values,
      }))
    );

  const readyRef = useRef<Types.ReadyRef>([
    onReady,
    { ...readyOptions, onPropsChange: handlePropsChange },
  ]);

  const stringify = useMemo(
    () =>
      JSON.stringify(
        !Array.isArray(options)
          ? options
          : options.map(({ template }) => template?.id)
      ),
    [options]
  );

  const widgets = useMemo(() => {
    const opts = JSON.parse(stringify);

    //* Map Key: Widget ID
    const result: WidgetMap = new Map(
      Array.from(templates.values()).map((widget) => [widget.id, widget])
    );

    if (!Array.isArray(opts)) {
      result.set(opts.id, opts);
    } else {
      opts.forEach((id) => {
        const widget = templates.get(id);

        if (widget) {
          result.set(widget.id, widget);
        }
      });
    }

    return result;
  }, [stringify, templates]);

  useEffect(() => {
    startTransition(() => {
      const [ready, opts] = readyRef.current;

      dispatch(widgets);

      if (ready instanceof Function) {
        const { onPropsChange } = opts;

        ready(onPropsChange);
      } else if (ready) {
        getEventHandler(ready, { ...opts, eventName: 'onReady' })();
      }
    });
  }, [widgets]);

  return [states, { props: handlePropsChange, state: dispatch }];
};
