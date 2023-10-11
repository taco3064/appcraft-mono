import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { PALETTES } from '@appcraft/themes';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { AdminLayout } from '~appcraft/containers';
import { PageContainer } from '~appcraft/styles';
import { searchHierarchy } from '~appcraft/services';
import { useFixedT, useSettingModified } from '~appcraft/hooks';
import { withPerPageLayout } from '~appcraft/hocs';

export default withPerPageLayout(AdminLayout, function Settings() {
  const { back } = useRouter();
  const [at, nt, tt] = useFixedT('app', 'nav', 'themes');
  const [{ lng, theme }, handleSetting] = useSettingModified();

  const { data: palettes } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['themes'],
  });

  return (
    <PageContainer
      maxWidth="xs"
      primary={nt('ttl-settings')}
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
        value={lng}
        onChange={(e) => handleSetting.lng(e.target.value)}
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
        value={theme}
        onChange={(e) => handleSetting.theme(e.target.value)}
      >
        {Object.keys(PALETTES).map((opt) => (
          <MenuItem key={opt} value={opt}>
            {tt(`opt-theme-${opt.toLowerCase().replace(/_/g, '-')}`)}
          </MenuItem>
        ))}

        {!palettes?.length ? (
          <Divider />
        ) : (
          palettes.map(({ _id: value, name }) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))
        )}
      </TextField>

      <Divider />

      <Button fullWidth size="large" color="secondary" onClick={back}>
        {at('btn-back')}
      </Button>
    </PageContainer>
  );
});
