export interface WidgetOptions<P extends object = object> {
  id: string;
  superior?: string;
  description?: string;
  type: string;
  props?: P;
}
