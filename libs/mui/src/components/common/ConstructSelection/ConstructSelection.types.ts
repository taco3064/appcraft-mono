import type { Status } from '../../../hooks';

export interface ConstructSelectionProps {
  status: Status;
  onStatusChange: (e: Status) => void;
}
