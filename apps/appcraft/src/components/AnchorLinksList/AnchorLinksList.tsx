import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { ExhibitorUtil } from '@appcraft/exhibitor';

import CommonButton from '../CommonButton';
import { useFixedT, useLinkHandles } from '~appcraft/hooks';
import type { AnchorLinksListProps } from './AnchorLinksList.types';

export default function AnchorLinksList({
  layouts,
  getWidgetOptions,
}: AnchorLinksListProps) {
  const [at] = useFixedT('app');

  const [{ events, outputs, subtitle }, handleLink] = useLinkHandles(
    layouts,
    getWidgetOptions
  );

  console.log('AnchorLinksList', outputs);

  return (
    /**
     * * 條列出所有可具有連結的事件，點擊後：
     * * 1. 選擇綁定其他頁面 URL
     * * 2. 選擇目標頁面的 props
     * * 3. 承2，選擇要變成 URL Search Params 的 Output，與 props 進行配對
     *
     * ? 待解決的問題：
     * * 1. 必須想辦法在產生 options 時就先行取得 Output，以便後續選擇 (解決)
     * ? 2. 目標連結頁面接收到 URL Search Params 後，如何將其轉換成 props ?
     * */
    <List
      subheader={
        !outputs?.length ? null : (
          <CraftsmanStyle.ListToolbar>
            <CommonButton
              btnVariant="icon"
              text={at('btn-back')}
              icon={<ArrowBackIcon />}
              onClick={handleLink.back}
            />

            <CraftsmanStyle.AutoBreakTypography
              primary={subtitle?.primary}
              secondary={subtitle?.secondary}
              secondaryTypographyProps={{
                whiteSpace: 'pre-line',
                display: '-webkit-box',
                overflow: 'hidden',
                style: {
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                },
              }}
            />
          </CraftsmanStyle.ListToolbar>
        )
      }
    >
      <Collapse in={Boolean(!outputs?.length)}>
        {events.map((event) => {
          const { alias, todoName, nodePaths } = event;
          const description = ExhibitorUtil.getPropPath([...nodePaths, alias]);

          return (
            <ListItemButton
              key={description}
              onClick={() => handleLink.click(event)}
            >
              <ListItemText
                primary={alias || todoName}
                secondary={description}
              />
            </ListItemButton>
          );
        })}
      </Collapse>
    </List>
  );
}
