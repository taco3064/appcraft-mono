import type { CollapseProps } from '@mui/material/Collapse';

export interface CollapseKeywordProps {
  CollapseProps?: Omit<
    CollapseProps,
    'addEndListener' | 'component' | 'in' | 'sx'
  >;

  defaultValue: string;
  in: boolean;
  onCollapse?: () => void;
  onConfirm: (value: string) => void;
}
