export interface WidgetOptions<P extends object = object> {
  id: string;
  superior?: string;
  description?: string;
  props?: P;
}
