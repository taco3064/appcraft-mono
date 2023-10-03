import type { Website } from '@appcraft/types';

export interface WebsiteLayoutEditorProps {
  value: Website;
  onChange: (value: Website) => void;
}
