export const statuses = [null, 'state', 'props'] as const;
export type Status = (typeof statuses)[number];

export interface TypeItemSelectionProps {
  status: Status;
  onStatusChange: (e: Status) => void;
}
