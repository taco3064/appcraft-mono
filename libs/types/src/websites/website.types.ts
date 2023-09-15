export interface Website {
  theme: string;
  nav: {
    position: 'top' | 'left';
  };
  pages: {
    id: string; //* Page Config ID
    subTitle: string; //* 副標題，與 Website Title(Hierarchy Name) 顯示在網頁標題列
    pathname: string; //* 網址路徑
    isNavItem: boolean; //* 是否為導覽列項目
    routes?: Website['pages']; //* 子頁面
    links?: {
      layout: string; //* Layout ID
      todoPath: string; //* 觸發事項路徑
      to: string; //* 跳轉路徑
    }[];
  }[];
}
