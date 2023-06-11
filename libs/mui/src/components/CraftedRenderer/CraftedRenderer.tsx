import { RendererProvider } from '../../contexts';
import { WidgetGenerator } from '../WidgetGenerator';
import type { CraftedRendererProps } from './CraftedRenderer.types';

export default function CraftedRenderer({
  lazy,
  options,
}: CraftedRendererProps) {
  return !options ? null : (
    <RendererProvider lazy={lazy}>
      {!Array.isArray(options) ? (
        <WidgetGenerator options={options} />
      ) : (
        options.map((layout) => <>Layout</>)
      )}
    </RendererProvider>
  );
}
