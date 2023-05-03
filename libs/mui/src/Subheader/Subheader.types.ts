export interface SubheaderProps {
  open: boolean;

  onAddElement?: () => void;
  onBack: (index?: number) => void;

  breadcrumbs: {
    name: string;
    isArrayElement: boolean;
    isLast: boolean;
  }[];
}
