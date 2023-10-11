import type { PerPageLayoutHoc } from './withPerPageLayout.types';

export const withPerPageLayout: PerPageLayoutHoc = (Layout, Page) => {
  Page.getLayout = (page) => <Layout>{page}</Layout>;

  return Page;
};
