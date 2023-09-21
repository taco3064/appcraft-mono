import type { UseMutateFunction } from '@tanstack/react-query';

import type { HierarchyData } from '~appcraft/services';
import type { CommonButtonProps } from '~appcraft/components';

enum EditorMode {
  add,
  update,
}

export type Mode = keyof typeof EditorMode;

interface BaseProps<T extends keyof typeof EditorMode, D>
  extends Partial<Pick<CommonButtonProps, 'btnVariant'>> {
  CommonButtonProps?: Omit<
    CommonButtonProps,
    'btnVariant' | 'icon' | 'text' | 'onClick'
  >;

  mode: T;
  data: D;
  onCancel?: () => void;
  onConfirm: UseMutateFunction<HierarchyData<string>, unknown, HierarchyData>;
}

export type HierarchyMutationButtonProps =
  | BaseProps<'update', HierarchyData<string>>
  | BaseProps<
      'add',
      Partial<Omit<HierarchyData, '_id' | 'category' | 'type'>> &
        Pick<HierarchyData, 'category' | 'type'>
    >;
