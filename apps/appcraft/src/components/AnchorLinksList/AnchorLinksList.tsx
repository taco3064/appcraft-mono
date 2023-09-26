import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { ExhibitorUtil } from '@appcraft/exhibitor';

import CommonButton from '../CommonButton';
import { useFixedT, useLinkHandles, useParameterKeys } from '~appcraft/hooks';
import type { AnchorLinksListProps } from './AnchorLinksList.types';

export default function AnchorLinksList({
  layouts,
  navid,
  pages,
  value,
  getWidgetOptions,
  onChange,
}: AnchorLinksListProps) {
  const [at, wt] = useFixedT('app', 'websites');

  const [{ events, outputs, active }, handleLink] = useLinkHandles(
    layouts,
    value,
    getWidgetOptions,
    onChange
  );

  const options = pages.filter(({ value }) => value.nav !== navid);
  const keys = useParameterKeys(options, active);

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
              primary={active?.title}
              secondary={active?.subtitle}
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
      {/* // * === 事件選擇 ===
          // * 1. 條列出支援跳轉連結的事件
          // * 2. 點擊後，將會進入連結設定
       */}
      <Collapse in={Boolean(!outputs?.length)}>
        {events.map((event, i) => {
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

              {handleLink.resetable(event) && (
                <CraftsmanStyle.TypeItemAction>
                  <CommonButton
                    btnVariant="icon"
                    icon={<RestartAltIcon />}
                    text={at('btn-delete')}
                    onClick={() => handleLink.remove('link', i)}
                  />
                </CraftsmanStyle.TypeItemAction>
              )}
            </ListItemButton>
          );
        })}
      </Collapse>

      {/* // * === 連結設定 ===
          // * 1. 根據當前已建置之網頁，轉換出可跳轉的頁面選項（但不包含本身）
          // * 2. 選擇目標跳轉頁面後，可增加 URL Search Params 設定
          // * 3. URL Search Params 設定包含：參數名稱、值的來源（Output）
          // * 4. Output 是根據事件執行結果產生的
       */}
      <Collapse in={Boolean(outputs?.length)}>
        <ListItem divider>
          <ListItemText
            disableTypography
            primary={
              <TextField
                required
                select
                size="small"
                variant="outlined"
                label="To"
                value={active?.link?.to || ''}
                onChange={handleLink.to}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CommonButton
                        btnVariant="icon"
                        size="small"
                        text={wt('btn-add-params')}
                        icon={<AddIcon />}
                        disabled={!keys.length}
                        onClick={handleLink.add}
                      />
                    </InputAdornment>
                  ),
                }}
              >
                {options.map(({ value, primary, secondary }) => (
                  <MenuItem key={value.nav} value={value.nav}>
                    <ListItemText primary={primary} secondary={secondary} />
                  </MenuItem>
                ))}
              </TextField>
            }
          />
        </ListItem>

        {active?.link?.searchParams?.map(({ key, value }, i) => (
          <ListItem key={`params-${i}`}>
            <ListItemText
              disableTypography
              primary={<Typography variant="subtitle1">#{i + 1}</Typography>}
              secondary={
                <>
                  <TextField
                    required
                    select
                    size="small"
                    variant="outlined"
                    margin="normal"
                    label={wt('lbl-param-key')}
                    value={key}
                    onChange={(e) =>
                      handleLink.params('key', i, e.target.value)
                    }
                  >
                    {keys.map(({ value, primary }) => (
                      <MenuItem key={value} value={value}>
                        {primary}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    required
                    select
                    size="small"
                    variant="outlined"
                    margin="normal"
                    label={wt('lbl-param-value')}
                    value={value}
                    onChange={(e) =>
                      handleLink.params('value', i, e.target.value)
                    }
                  >
                    {outputs.map(({ todo, alias, output }) => (
                      <MenuItem key={todo} value={todo}>
                        {alias || todo}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              }
            />

            <CraftsmanStyle.TypeItemAction>
              <CommonButton
                btnVariant="icon"
                icon={<CloseIcon />}
                text={at('btn-delete')}
                onClick={() => handleLink.remove('params', i)}
              />
            </CraftsmanStyle.TypeItemAction>
          </ListItem>
        ))}
      </Collapse>
    </List>
  );
}
