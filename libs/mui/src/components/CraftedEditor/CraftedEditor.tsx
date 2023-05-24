import { TypeEditor } from '../TypeEditor';
import type { CraftedEditorProps } from './CraftedEditor.types';

export default function CraftedEditor({
  select,
  ...props
}: CraftedEditorProps) {
  return <TypeEditor {...props} />;
}
