import type { NextPage } from 'next';
import type { ComponentType, ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type PerPageLayoutHoc = <P = object, IP = P>(
  Layout: ComponentType<{ children: ReactNode }>,
  Page: NextPageWithLayout<P, IP>
) => NextPageWithLayout<P, IP>;
