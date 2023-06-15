export type RenderFn<D, R> = (
  options: R & {
    fetchData: D;
  }
) => JSX.Element;
