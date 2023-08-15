import type { AppBarProps } from '@mui/material/AppBar';

import type { EditorProviderProps, OptionValues } from '../../contexts';
import type { FetchTypeDefinition } from '../../hooks';
import type { TypeListProps } from '../../components';

export type LazyTypeListProps<V extends OptionValues> = Omit<
  TypeListProps<V>,
  'collection'
> & {
  placeholder: string;
};

export interface CraftedTypeEditorProps<V extends OptionValues>
  extends Pick<TypeListProps<V>, 'exclude'>,
    Omit<EditorProviderProps<V>, 'children' | 'collectionPath'> {
  fullHeight?: boolean;
  onFetchDefinition: FetchTypeDefinition;

  HeaderProps?: {
    primary: string;
    secondary?: string;
    onBack: () => void;
    sx?: AppBarProps['sx'];
  };
}
