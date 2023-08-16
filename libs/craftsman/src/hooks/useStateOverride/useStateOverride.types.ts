import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

import type * as Context from '../../contexts';

//* Variables
type OverridePropsType = 'TODO_NAMING';
type OverrideRenderType = 'TODO_EDITOR';

type OverrideOptions = {
  overrideNamingProps?: Context.OverrideNamingProps;
  renderOverrideItem?: Context.RenderOverrideItem;
};

export type EditedState = {
  category: Appcraft.StateCategory;
  path: string;
};

//* Methods
export type GetOverridePropsType = (
  ...args: Parameters<Context.OverrideNamingProps>
) => OverridePropsType | undefined;

export type GetOverrideRenderType = (
  ...args: Parameters<Context.RenderOverrideItem>
) => OverrideRenderType | undefined;

//* Custom Hooks
export type StateOverrideHook = (
  widget: Appcraft.MainWidget,
  editedState: EditedState | undefined,
  options: OverrideOptions,
  override: Record<
    OverrideRenderType,
    (
      options: Context.RenderOverrideItemArgs<'display'>[1],
      state: Appcraft.WidgetState
    ) => JSX.Element
  > &
    Record<OverridePropsType, (state: Appcraft.WidgetState) => ReactNode>
) => Required<OverrideOptions>;
