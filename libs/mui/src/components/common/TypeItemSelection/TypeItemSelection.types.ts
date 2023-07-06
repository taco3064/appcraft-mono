import type { Status } from '../../../hooks';

export interface TypeItemSelectionProps {
  status: Status;
  onStatusChange: (e: Status) => void;
}
