export interface HierarchyParams {
  keyword?: string;
  superior?: string;
  type?: 'group' | 'item';
}

export interface HierarchyData<U = undefined> {
  _id: U;
  userid: string;
  category: string;
  description?: string;
  name: string;
  superior?: string;
  type: 'group' | 'item';
}
