import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';

import { CommonButton } from '~appcraft/components/common';
import { useFixedT } from '~appcraft/contexts';
import { useWidth } from '~appcraft/hooks';
import type * as Types from './CollapseKeyword.types';

const SEARCH_WIDTH: Record<'xs' | 'sm', string> = {
  xs: '100%',
  sm: '80%',
};

export default function CollapseKeyword({
  CollapseProps,
  in: open,
  defaultValue,
  onCollapse,
  onConfirm,
}: Types.CollapseKeywordProps) {
  const width = useWidth();
  const keywordRef = useRef<HTMLInputElement>(null);
  const [at] = useFixedT('app');

  return (
    <Collapse
      {...CollapseProps}
      in={open}
      addEndListener={() => keywordRef.current?.focus()}
      component="form"
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',

        '& > .MuiCollapse-wrapper': {
          width: SEARCH_WIDTH[width] || '50%',
          paddingBottom: theme.spacing(3),
        },
      })}
      onSubmit={(e) => {
        const formdata = new FormData(e.currentTarget as HTMLFormElement);

        e.preventDefault();
        onConfirm(formdata.get('keyword') as string);
      }}
    >
      <TextField
        fullWidth
        variant="filled"
        color="info"
        size="small"
        name="keyword"
        inputRef={keywordRef}
        placeholder={at('plh-keyword')}
        defaultValue={defaultValue}
        InputProps={{
          sx: (theme) => ({
            borderRadius: `${theme.spacing(2.5)} / 50%`,

            '& > input': {
              borderRadius: `${theme.spacing(2.5)} / 50%`,
              borderTopRightRadius: '0 !important',
              borderBottomRightRadius: '0 !important',
              padding: theme.spacing(1.5, 2.5),
            },
          }),
          endAdornment: (
            <InputAdornment position="end">
              <CommonButton
                btnVariant="icon"
                size="small"
                icon={<FilterListOffIcon />}
                text={at('btn-filter-clear')}
                onClick={() => {
                  keywordRef.current.value = '';
                  keywordRef.current.focus();
                  onConfirm('');
                }}
              />

              {onCollapse && (
                <CommonButton
                  btnVariant="icon"
                  size="small"
                  icon={<CloseIcon />}
                  text={at('btn-close')}
                  onClick={onCollapse}
                />
              )}
            </InputAdornment>
          ),
        }}
      />
    </Collapse>
  );
}
