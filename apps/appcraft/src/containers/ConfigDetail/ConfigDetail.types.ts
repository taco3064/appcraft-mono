import type { ReactNode } from 'react';
import type { CraftedTypeEditorProps } from '@appcraft/craftsman';
import type { ConfigOptions } from '@appcraft/types';

import type { Breadcrumb, ConfigValueOptions } from '~appcraft/hooks';
import type { NodePickerFn } from '~appcraft/hooks/common';

export type RenderOverrideConfigItemHandler =
  CraftedTypeEditorProps<ConfigOptions>['renderOverrideItem'];

export interface ConfigDetailProps
  extends ConfigValueOptions,
    Pick<CraftedTypeEditorProps<ConfigOptions>, 'renderOverrideItem'> {
  header?: ReactNode;
  onActionNodePick?: NodePickerFn<'reset' | 'save'>;

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
