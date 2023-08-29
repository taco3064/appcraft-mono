import _get from 'lodash/get';
import _set from 'lodash/set';
import { useEffect, useMemo, useReducer, useRef, useTransition } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getEventHandler } from '../../../utils';
import type * as Types from './useStateReducer.types';
import type { PropsChangeHandler } from '../../../utils';

function reducer(
  states: Types.ReducerState,
  action: Types.ReducerAction | Types.ReducerAction[] | Types.InitialAction
) {
  //* Runtime 期間變更值使用
  if (!(action instanceof Map)) {
    return (Array.isArray(action) ? action : [action]).reduce(
      (result, { id, values, isProps = false }) => {
        Object.entries(values).forEach(([propPath, value]) => {
          _set(result, [id, propPath, 'value'], value);

          if (isProps) {
            _set(result, [id, propPath, 'isProps'], true);
          }
        });

        return result;
      },
      { ...states }
    );
  }

  //* 初始化
  return Array.from(action.values()).reduce<Types.ReducerState>(
    (result, { widget, props }) => {
      const { id, state } = widget;
      const acc: Types.ReducerState[string] = {};

      Object.entries(state || {}).forEach(([category, $state]) =>
        Object.entries($state).forEach(([stateKey, opts]) => {
          const propValue = _get(props, [category, opts.alias || stateKey]);

          acc[stateKey] = {
            category: category as Appcraft.StateCategory,
            isProps: propValue != null,
            options: opts,
            value: propValue || opts.defaultValue,
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
        isProps: true,
        values,
      }))
    );

  const readyRef = useRef<Types.ReadyRef>([
    onReady,
    { ...readyOptions, onPropsChange: handlePropsChange },
  ]);

  //* 取出 Injection Props
  const propsStringify = useMemo(() => {
    if (!Array.isArray(options)) {
      return JSON.stringify({});
    }

    return JSON.stringify(
      options.reduce<Types.InjectionProps>(
        (result, { template: { id, props, todos } }) => ({
          ...result,
          [id]: { props, todos },
        }),
        {}
      )
    );
  }, [options]);

  //* 將主要的 Widget 轉為 JSON stringify
  const mainStringify = useMemo(
    () =>
      JSON.stringify(
        !Array.isArray(options)
          ? options
          : options.map(({ template }) => template?.id)
      ),
    [options]
  );

  //* 將所有 Widget 轉為 Map
  const widgets = useMemo(() => {
    const opts = JSON.parse(mainStringify);

    //* Map Key: Widget ID
    const result: Types.InitialAction = new Map(
      Array.from(templates.values()).map((widget) => [widget.id, { widget }])
    );

    if (!Array.isArray(opts)) {
      result.set(opts.id, { widget: opts });
    } else {
      const props = JSON.parse(propsStringify);

      opts.forEach((id) => {
        const widget = templates.get(id);

        if (widget) {
          result.set(widget.id, { widget, props: props[id] });
        }
      });
    }

    return result;
  }, [propsStringify, mainStringify, templates]);

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
