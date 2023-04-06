import type { HierarchyData } from '~appcraft/services';
import type { CommonButtonProps } from '../common';

enum EditorMode {
  add,
  update,
}

export type Mode = keyof typeof EditorMode;

interface BaseProps<T extends keyof typeof EditorMode, D>
  extends Partial<Pick<CommonButtonProps, 'IconProps' | 'btnVariant'>> {
  CommonButtonProps?: Omit<
    CommonButtonProps,
    'IconProps' | 'btnVariant' | 'icon' | 'text' | 'onClick'
  >;

  mode: T;
  data: D;
  onConfirm?: (data: HierarchyData<string>) => void;
}

export type HierarchyEditorButtonProps =
  | BaseProps<'update', HierarchyData<string>>
  | BaseProps<
      'add',
      Partial<Omit<HierarchyData, '_id' | 'category' | 'type'>> &
        Pick<HierarchyData, 'category' | 'type'>
    >;
