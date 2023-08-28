import type * as Craftsman from '@appcraft/craftsman';

//* Variables
type RenderOverrideItem =
  Craftsman.CraftedWidgetEditorProps['renderOverrideItem'];
type OverrideRenderType = 'WIDGET_PICKER' | 'STATE_PICKER' | 'TODO_PICKER';

//* Methods
export type GetOverrideRenderType = (
  ...args: Parameters<RenderOverrideItem>
) => OverrideRenderType | void;

//* Custom Hooks
export type CraftedWidgetOverrideHook = (
  override: Record<
    OverrideRenderType,
    (...args: Parameters<RenderOverrideItem>) => JSX.Element
  >
) => RenderOverrideItem;
