type ExtractType = 'extractType' | 'extractBy';

type ExtractMethod =
  | 'getInterface'
  | 'getModule'
  | 'getTypeAlias'
  | 'getProperty';

type Override<E extends ExtractType> = {
  patternType: 'RegExp' | 'string';
  pattern: string;
  replacement: string;
} & (E extends 'extractBy'
  ? { extractBy: ExtractMethod }
  : {
      extractType: {
        method: ExtractMethod;
        typeName: string;
      }[];
    });

interface Initialize {
  typeFile: string;
  override: Override<'extractType'>[];
}

interface Component {
  id: string;
  importType: 'mui';
  typeFile: string;
  typeName: string;
  override?: Override<'extractBy'>[];
}

interface WidgetGroup {
  category: string;
  components: Component[];
}

export interface Mui {
  initialize: Initialize[];
  widgets: WidgetGroup[];
}
