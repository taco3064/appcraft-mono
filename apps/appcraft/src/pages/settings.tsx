import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';

import { PageContainer } from '~appcraft/styles';
import { useFixedT, useSettingModified } from '~appcraft/hooks';

export default function Settings() {
  const { back } = useRouter();
  const [at, nt] = useFixedT('app', 'nav');
  const modified = useSettingModified();

  return (
    <PageContainer
      maxWidth="xs"
      title={nt('ttl-settings')}
      ContentProps={{
        sx: (theme) => ({
          '& > * + *': { marginTop: `${theme.spacing(2)} !important` },
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

      <Divider />

      <Button fullWidth size="large" color="secondary" onClick={back}>
        {at('btn-back')}
      </Button>
    </PageContainer>
  );
}
