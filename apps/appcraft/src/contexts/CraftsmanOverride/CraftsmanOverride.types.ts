import type * as Craftsman from '@appcraft/craftsman';
import type { LayoutWidget, MainWidget } from '@appcraft/types';
import type { MutableRefObject, ReactNode } from 'react';

import type * as Ctr from '~appcraft/containers';

//* Variables
type Mixeds = 'STATE_DEFAULT_PROP_VALUE';
type Namings = 'TEMPLATE_TODO_NAMING';

type Renders =
  | 'TEMPLATE_TODO_ITEM'
  | 'TEMPLATE_WIDGET_PICKER'
  | 'TODO_PROPS_GROUP_PICKER'
  | 'TODO_PROPS_PATH_PICKER'
  | 'TODO_STATE_PATH_PICKER'
  | 'TODO_WRAPPER_PICKER';

export type OverrideOptions = {
  hierarchyid?: string;
  overrides: ReturnType<GetOverridesFn>;
  layouts?: LayoutWidget[];
  widget?: MainWidget;
};

export type OverrideHandlers = Required<
  Pick<
    Craftsman.CraftedWidgetEditorProps,
    'overrideMixedOptions' | 'overrideNamingProps' | 'renderOverrideItem'
  >
>;

export type OverrideRender = Partial<
  OverrideHandler<Mixeds, 'overrideMixedOptions'> &
    OverrideHandler<Namings, 'overrideNamingProps'> &
    OverrideHandler<Renders, 'renderOverrideItem'>
>;

//* Methods
type OverrideHandler<
  C extends Mixeds | Namings | Renders,
  K extends keyof OverrideHandlers
> = Record<
  C,
  (
    options: OverrideOptions,
    ...args: Parameters<OverrideHandlers[K]>
  ) => ReturnType<OverrideHandlers[K]>
>;

export type MetType = {
  mixed: (
    ...args: Parameters<OverrideHandlers['overrideMixedOptions']>
  ) => Mixeds | void;

  naming: (
    ...args: Parameters<OverrideHandlers['overrideNamingProps']>
  ) => Namings | void;

  render: (
    ...args: Parameters<OverrideHandlers['renderOverrideItem']>
  ) => Renders | void;
};

export type GetOverridesFn = (
  override: OverrideRender
) => (options: OverrideOptions) => OverrideHandlers;

//* Custom Hooks
export type CraftsmanOverrideContextValue = {
  hierarchyid?: string;
  ref: MutableRefObject<ReturnType<GetOverridesFn>>;
};

export type CraftsmanOverrideContextHook = (
  options?: Pick<OverrideOptions, 'layouts' | 'widget'>
) => Partial<OverrideHandlers>;

//* Provider Component Props
export interface CraftsmanOverrideProviderProps {
  children: ReactNode;
  hierarchyid?: string;
  options: OverrideRender;
}
