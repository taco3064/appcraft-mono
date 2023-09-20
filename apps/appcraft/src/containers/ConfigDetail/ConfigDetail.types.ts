import type { ReactNode } from 'react';
import type { CraftedTypeEditorProps } from '@appcraft/craftsman';
import type { ConfigOptions } from '@appcraft/types';

import type * as Hook from '~appcraft/hooks';

export type RenderOverrideConfigItemHandler =
  CraftedTypeEditorProps<ConfigOptions>['renderOverrideItem'];

export interface ConfigDetailProps
  extends Hook.ConfigValueOptions,
    Pick<CraftedTypeEditorProps<ConfigOptions>, 'renderOverrideItem'> {
  header?: ReactNode;
  onActionNodePick?: Hook.NodePickerFn<'reset' | 'save'>;

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Hook.Breadcrumb[];
  };
}
