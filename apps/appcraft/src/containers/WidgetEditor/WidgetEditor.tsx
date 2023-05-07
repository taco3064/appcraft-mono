import { useState } from 'react';

import { PersistentDrawerContent } from '~appcraft/components';
import type { WidgetEditorProps } from './WidgetEditor.types';

export default function WidgetEditor({
  PersistentDrawerContentProps,
}: WidgetEditorProps) {
  const [open, setOpen] = useState(true);

  return (
    <PersistentDrawerContent
      {...PersistentDrawerContentProps}
      DrawerProps={{ anchor: 'right', maxWidth: 'xs' }}
      drawer={<>Drawer Content</>}
      open={open}
    >
      Content
    </PersistentDrawerContent>
  );
}
