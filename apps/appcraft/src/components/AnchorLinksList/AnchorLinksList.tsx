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
import { useFixedT, useLinkHandles } from '~appcraft/hooks';
import type { AnchorLinksListProps } from './AnchorLinksList.types';

export default function AnchorLinksList({
  layouts,
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

  const targets = pages.filter(({ pathname }) => pathname !== value.pathname);

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
                        onClick={handleLink.add}
                      />
                    </InputAdornment>
                  ),
                }}
              >
                {targets.map(({ pathname, subTitle }) => (
                  <MenuItem key={pathname} value={pathname}>
                    <ListItemText primary={subTitle} secondary={pathname} />
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
                    size="small"
                    variant="outlined"
                    margin="normal"
                    label={wt('lbl-param-key')}
                    value={key}
                    onChange={(e) =>
                      handleLink.params('key', i, e.target.value)
                    }
                  />

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
