import { RendererProvider } from '../../contexts';
import type { CraftedRendererProps } from './CraftedRenderer.types';

export default function CraftedRenderer({ options }: CraftedRendererProps) {
  const { widgets } = options;

  return <RendererProvider options={options}>test</RendererProvider>;
}
