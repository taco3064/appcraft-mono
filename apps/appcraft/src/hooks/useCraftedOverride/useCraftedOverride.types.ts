import type * as Craftsman from '@appcraft/craftsman';

//* Variables
type MixedOptions = 'STATE_DEFAULT_PROP_VALUE';
type NamingProps = 'TEMPLATE_TODO_NAMING';

type RenderItem =
  | 'TEMPLATE_TODO_EDITOR'
  | 'TEMPLATE_WIDGET_PICKER'
  | 'TODO_STATE_PATH_PICKER'
  | 'TODO_WRAPPER_PICKER';

type Overrides = Required<
  Pick<
    Craftsman.CraftedWidgetEditorProps,
    'overrideMixedOptions' | 'overrideNamingProps' | 'renderOverrideItem'
  >
>;

//* Methods
export type MetType = {
  mixed: (
    ...args: Parameters<Overrides['overrideMixedOptions']>
  ) => MixedOptions | void;

  naming: (
    ...args: Parameters<Overrides['overrideNamingProps']>
  ) => NamingProps | void;

  render: (
    ...args: Parameters<Overrides['renderOverrideItem']>
  ) => RenderItem | void;
};

//* Custom Hooks
export type CraftedOverrideHook = (
  override: Partial<
    Record<MixedOptions, Required<Overrides['overrideMixedOptions']>> &
      Record<NamingProps, Required<Overrides['overrideNamingProps']>> &
      Record<RenderItem, Required<Overrides['renderOverrideItem']>>
  >
) => Overrides;
