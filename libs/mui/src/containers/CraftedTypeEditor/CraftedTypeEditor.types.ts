import type { EditorProviderProps, OptionValues } from '../../contexts';
import type { FetchTypeDefinition } from '../../hooks';
import type { HeaderProps, TypeListProps } from '../../components';

export type LazyTypeListProps<V extends OptionValues> = Omit<
  TypeListProps<V>,
  'collection'
> & {
  placeholder: string;
};

export interface CraftedTypeEditorProps<V extends OptionValues>
  extends Pick<TypeListProps<V>, 'exclude'>,
    Omit<EditorProviderProps<V>, 'children' | 'collectionPath'> {
  HeaderProps?: HeaderProps;
  fullHeight?: boolean;
  open?: boolean;
  onFetchDefinition: FetchTypeDefinition;
}
