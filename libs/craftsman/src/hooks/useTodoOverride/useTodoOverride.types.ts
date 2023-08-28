import type * as Appcraft from '@appcraft/types';

import type * as Ctx from '../../contexts';

//* Variables
type OverrideRenderType = 'OUTPUT_PATH_PICKER' | 'EVENT_PARAMS_PICKER';

//* Methods
export type GetOverrideRenderType = (
  ...args: Parameters<Ctx.RenderOverrideItem>
) => OverrideRenderType | undefined;

//* Custom Hooks
export type TodoOverrideHook = (
  todos: Record<string, Appcraft.WidgetTodo>,
  editedId: string | undefined,
  renderOverrideItem: Ctx.RenderOverrideItem | undefined,
  override: Record<
    OverrideRenderType,
    (
      options: Ctx.RenderOverrideItemArgs<'display'>[1],
      todo: Appcraft.WidgetTodo
    ) => JSX.Element
  >
) => Ctx.RenderOverrideItem;
