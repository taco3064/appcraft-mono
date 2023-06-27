import type { AxiosRequestConfig } from 'axios';

//* RetrieveTarget - 僅指定資料型態
export type RetrieveTarget =
  | 'Retrieve Target'
  | RetrieveTarget[]
  | { [key: string]: RetrieveTarget };

//* Definition - 明確定義的資料值
export type Definition =
  | boolean
  | Date
  | number
  | string
  | Definition[]
  | { [key: string]: Definition };

//* Reusable Events
type Todos = 'convert' | 'define' | 'fetch';

type BaseTodoEvent<C extends Todos, P> = {
  category: C;
  outputKey: string; //* Output Key
  description: string;
  retrieve?: { [key: string]: RetrieveTarget };
} & P;

export type DefineTodoEvent = BaseTodoEvent<
  'define',
  {
    initial?: Definition; //* 初始值
    template?: string; //* 使用 lodash template 讀取 inputs 建立初始值
  }
>;

export type FetchTodoEvent = BaseTodoEvent<
  'fetch',
  Pick<AxiosRequestConfig, 'url' | 'method'> & {
    headers?: Record<
      | 'Accept'
      | 'Content-Length'
      | 'User-Agent'
      | 'Content-Encoding'
      | 'Authorization',
      string
    >;
  }
>;

export type ConvertTodoEvent = BaseTodoEvent<
  'convert',
  {
    conversions: {
      evaluation?: EvaluateFlowNode; //* 條件判斷
      getter: DefineTodoEvent; //* 目標要進行轉換的值
      setter: string; //* 目標進行回寫值的路徑 (for output)
    }[]; //* 轉換函式名稱
  }
>;

export type TodoEvent = DefineTodoEvent | FetchTodoEvent | ConvertTodoEvent;

//* Flows
type Flows = 'evaluate' | 'iterate';

type BaseFlowNode<C extends Flows, P = never> = {
  category: C;
  description?: string;
  extractResultPath: string; //* Flow Node 目標要處理值的路徑
  done?: {
    type: 'state' | 'prop';
    statusKey: string; //* 目標進行回寫值的 Status Key (for output)
  };
} & P;

export type EvaluateFlowNode = BaseFlowNode<
  'evaluate',
  {
    target: Pick<DefineTodoEvent, 'initial' | 'template'>; //* 判斷值
    satisfied: FlowNode | TodoEvent; //* 條件成立時的下一步
  }
>;

export type IterateFlowNode = BaseFlowNode<
  'iterate',
  {
    conversion: ConvertTodoEvent;
  }
>;

export type FlowNode = EvaluateFlowNode | IterateFlowNode;
export type WidgetEvent = TodoEvent | FlowNode;
