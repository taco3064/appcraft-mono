import type { GroupData } from '~data-forge/services/DataGroup';

enum EditorMode {
  add,
  update,
}

export type Mode = keyof typeof EditorMode;
export type { GroupData };

interface BaseProps<T extends keyof typeof EditorMode, D = undefined> {
  mode: T;
  type: string;
  data: D;
  onConfirm?: (data: GroupData) => void;
}

export type GroupEditorProps =
  | BaseProps<'add'>
  | BaseProps<'update', GroupData>;
