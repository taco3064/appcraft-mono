import * as THEMES from '@appcraft/themes';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { PageContainer } from '~appcraft/styles';
import { searchHierarchy } from '~appcraft/services';
import { useFixedT, useSettingModified } from '~appcraft/hooks';

export default function Settings() {
  const { back } = useRouter();
  const [at, nt, tt] = useFixedT('app', 'nav', 'themes');
  const modified = useSettingModified();

  const { data: themes } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['themes'],
  });

  return (
    <PageContainer
      maxWidth="xs"
      title={nt('ttl-settings')}
      ContentProps={{
        sx: (theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(3),
        }),
      }}
    >
      <TextField
        fullWidth
        select
        label={at('lbl-lng')}
        value={modified.lng}
        onChange={(e) => modified.setLng(e.target.value)}
      >
        {__WEBPACK_DEFINE__.LANGUAGES.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {at(`opt-lng-${opt}`)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label={at('lbl-theme')}
        value={modified.theme}
        onChange={(e) => modified.setTheme(e.target.value)}
      >
        {Object.keys(THEMES).map((opt) => (
          <MenuItem key={opt} value={opt}>
            {tt(`opt-theme-${opt.toLowerCase().replace(/_/g, '-')}`)}
          </MenuItem>
        ))}

        {themes.map(({ _id: value, name }) => (
          <MenuItem key={value} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      <Divider />

      <Button fullWidth size="large" color="secondary" onClick={back}>
        {at('btn-back')}
      </Button>
    </PageContainer>
  );
}
