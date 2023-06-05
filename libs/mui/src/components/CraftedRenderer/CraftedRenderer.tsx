import { RendererProvider, RenderType } from '../../contexts';
import { WidgetGenerator } from '../WidgetGenerator';
import type { CraftedRendererProps } from './CraftedRenderer.types';

export default function CraftedRenderer<T extends RenderType>({
  options,
}: CraftedRendererProps<T>) {
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
