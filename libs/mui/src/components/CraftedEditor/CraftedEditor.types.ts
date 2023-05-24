import type { ReactElement } from 'react';
import type { TypeEditorProps } from '../TypeEditor';

export interface CraftedEditorProps<V extends object = object>
  extends TypeEditorProps<V> {
  select?: ReactElement;
}
