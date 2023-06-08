import type { WidgetStructureProps } from './WidgetStructure.types';

export default function WidgetStructure({ widget }: WidgetStructureProps) {
  return (
    <div>
      <h1>WidgetStructure</h1>
      <p>options: {JSON.stringify(widget)}</p>
    </div>
  );
}
