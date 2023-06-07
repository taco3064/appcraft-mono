import { RendererProvider } from '../../contexts';
import { WidgetGenerator } from '../WidgetGenerator';
import type { CraftedRendererProps } from './CraftedRenderer.types';

export default function CraftedRenderer({ options }: CraftedRendererProps) {
  return (
    <RendererProvider options={options}>
      {!Array.isArray(options) ? (
        <WidgetGenerator key={options.id} options={options} />
      ) : (
        options.map((layout) => <>Layout</>)
      )}
    </RendererProvider>
  );
}
