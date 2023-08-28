import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

import type * as Ctx from '../../contexts';

//* Variables
type OverrideMixedOptions = 'DEFAULT_STATE_VALUE';
type OverrideNamingProps = 'TODO_NAMING';
type OverrideRenderType = 'TODO_EDITOR';

type OverrideOptions = {
  overrideMixedOptions?: Ctx.OverrideMixedOptions;
  overrideNamingProps?: Ctx.OverrideNamingProps;
  renderOverrideItem?: Ctx.RenderOverrideItem;
};

export type EditedState = {
  category: Appcraft.StateCategory;
  path: string;
};

//* Methods
export type GetOverrideMixedType = (
  ...args: Parameters<Ctx.OverrideMixedOptions>
) => OverrideMixedOptions | undefined;

export type GetOverrideNamingType = (
  ...args: Parameters<Ctx.OverrideNamingProps>
) => OverrideNamingProps | undefined;

export type GetOverrideRenderType = (
  ...args: Parameters<Ctx.RenderOverrideItem>
) => OverrideRenderType | undefined;

//* Custom Hooks
export type StateOverrideHook = (
  widget: Appcraft.MainWidget,
  editedState: EditedState | undefined,
  options: OverrideOptions,
  override: Record<
    OverrideNamingProps,
    (state: Appcraft.WidgetState) => ReactNode
  > &
    Record<
      OverrideRenderType,
      (
        options: Ctx.RenderOverrideItemArgs<'display'>[1],
        state: Appcraft.WidgetState
      ) => JSX.Element
    > &
    Record<
      OverrideMixedOptions,
      (
        options: Parameters<Ctx.OverrideMixedOptions>[0],
        state: Appcraft.WidgetState
      ) => ReturnType<Ctx.OverrideMixedOptions>
    >
) => Required<OverrideOptions>;
