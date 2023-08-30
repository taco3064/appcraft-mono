export interface NodeTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
}
