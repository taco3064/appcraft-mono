import type { ReactNode } from 'react';

export interface NodeTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;

  renderPicker: (options: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => ReactNode;
}
