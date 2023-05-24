import type { DataSource, TypesParseOptions } from '@appcraft/types';
import type { EditorProviderProps } from '../../contexts';

export interface TypeEditorProps<V extends object = object>
  extends Omit<TypesParseOptions, 'propPath'>,
    Omit<EditorProviderProps<V>, 'children' | 'propPath'> {
  disableSelection?: boolean;
  parser: Pick<DataSource, 'url' | 'method' | 'headers'>;
}
