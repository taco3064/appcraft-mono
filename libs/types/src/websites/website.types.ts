import type { Breakpoint } from '@mui/material/styles';

export interface Website {
  backgroundImg?: string;
  homeid: string;
  logo?: string;
  maxWidth: Breakpoint;
  navAnchor: 'top' | 'left';
  theme: string;
  pages: {
    id: string;
    icon?: string;
    pageid: string;
    subTitle: string; //* 副標題，與 Website Title(Hierarchy Name) 顯示在網頁標題列
    pathname: string; //* 網址路徑
    isNavItem: boolean; //* 是否為導覽列項目
    routes?: Website['pages']; //* 子頁面
    links?: {
      layout: string; //* Layout ID
      nodePaths: (string | number)[];
      todoName: string;
      to: string; //* 跳轉路徑
      searchParams?: {
        key: string;
        value: string;
      }[];
    }[];
  }[];
}
