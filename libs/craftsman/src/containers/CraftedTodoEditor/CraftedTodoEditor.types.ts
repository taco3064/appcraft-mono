import type * as Appcraft from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';

import type * as Comp from '../../components';
import type * as Hook from '../../hooks';
import type { CraftedTypeEditorProps } from '../CraftedTypeEditor';

//* Component Props
export type LazyTodoInputSelectProps = Omit<
  Comp.TodoInputSelectProps,
  'definition'
>;

export interface CraftedTodoEditorProps
  extends Pick<Comp.TodoFlowControlsProps, 'disableCategories'>,
    Pick<
      CraftedTypeEditorProps<Appcraft.ConfigOptions>,
      'HeaderProps' | 'fullHeight' | 'renderOverrideItem'
    > {
  typeFile?: string;
  definitionSource?: Appcraft.TypesParseOptions;
  values?: Record<string, Appcraft.WidgetTodo>;
  variant?: 'normal' | 'popup';
  onChange: Hook.TodoChangeHandler;
  onEditToggle?: Hook.EditToggleHandler;
  onFetchData: Exhibitor.FetchDataHandler;
  onFetchTodoWrapper: Exhibitor.FetchWrapperHandler<'todo'>;
  onFetchDefinition: Hook.FetchTypeDefinition<
    Appcraft.StructureProp | Appcraft.FuncProp
  >;
}
