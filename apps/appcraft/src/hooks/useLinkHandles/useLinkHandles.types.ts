//* Variables
export type LinkOptions = {
  layoutid: string;
  todoName: string;
  todoPath: string;
  outputs: string[];
};

//* Custom Hooks
export type LinkHandlesHook = (
  enabled: boolean,
  pageid: string
) => [
  {
    options: LinkOptions[];
  }
];
