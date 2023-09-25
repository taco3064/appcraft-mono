import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useLinkHandles } from '~appcraft/hooks';
import type { AnchorLinksListProps } from './AnchorLinksList.types';

export default function AnchorLinksList({
  layouts,
  getWidgetOptions,
}: AnchorLinksListProps) {
  const [{ options }] = useLinkHandles(layouts);

  console.log('AnchorLinksList', layouts, options);

  return (
    /**
     * * 條列出所有可具有連結的事件，點擊後：
     * * 1. 選擇綁定其他頁面 URL
     * * 2. 選擇要變成 URL Search Params 的 Output

     * ? 待解決的問題：
     * ? 1. 必須想辦法在產生 options 時就先行取得 Output，以便後續選擇
     * ? 2. 目標連結頁面接收到 URL Search Params 後，如何將其轉換成 props ?
     * */
    <List>
      {options.map(({ todoName, todoPath }) => (
        <ListItemButton key={todoPath}>
          <ListItemText primary={todoName} secondary={todoPath} />
        </ListItemButton>
      ))}
    </List>
  );
}
