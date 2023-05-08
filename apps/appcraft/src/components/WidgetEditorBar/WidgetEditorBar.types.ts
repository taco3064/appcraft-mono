export interface WidgetEditorBarProps {
  variant: 'elements' | 'props';
  onElementAdd: (id: string) => void;
  onVariantChange: (variant: WidgetEditorBarProps['variant']) => void;
}
