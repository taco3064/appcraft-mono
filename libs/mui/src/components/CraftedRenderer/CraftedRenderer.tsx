import { RendererProvider } from '../../contexts';
import { WidgetGenerator } from '../WidgetGenerator';
import type { CraftedRendererProps } from './CraftedRenderer.types';

export default function CraftedRenderer({ options }: CraftedRendererProps) {
  const { widgets } = options;

  return (
    <RendererProvider options={options}>
      {widgets?.map((widget) => (
        <WidgetGenerator key={widget.id} options={widget} />
      ))}
    </RendererProvider>
  );
}
