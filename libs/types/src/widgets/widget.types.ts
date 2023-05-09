import type { ConfigData } from '../services/config.types';

export interface WidgetOptions<P extends object = object>
  extends Pick<ConfigData<P>, 'content' | 'mapping'> {
  id: string;
  superior?: string;
  description?: string;
  type: string;
}
