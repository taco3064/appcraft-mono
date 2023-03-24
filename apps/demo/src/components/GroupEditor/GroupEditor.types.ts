enum EditorMode {
  add,
  update,
}

export type Mode = keyof typeof EditorMode;

export interface GroupData {
  uid: string;
  name: string;
  description?: string;
}

interface BaseProps<T extends keyof typeof EditorMode, D = undefined> {
  mode: T;
  type: string;
  data: D;
}

export type GroupEditorProps =
  | BaseProps<'add'>
  | BaseProps<'update', GroupData>;
