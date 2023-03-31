import type { HierarchyData } from '~appcraft/services';

enum EditorMode {
  add,
  update,
}

export type Mode = keyof typeof EditorMode;

interface BaseProps<T extends keyof typeof EditorMode, D> {
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
