import type * as Appcraft from '@appcraft/types';
import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';

export interface CraftedTodoEditorProps
  extends Pick<
    CraftedTypeEditorProps<Appcraft.NodeWidget>,
    | 'fixedT'
    | 'fullHeight'
    | 'open'
    | 'parser'
    | 'values'
    | 'onBack'
    | 'onChange'
  > {
  todoPath?: string;
  typeFile?: string;
}
