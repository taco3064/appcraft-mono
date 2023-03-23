import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { PageContainer } from '~demo/styles';
import { useFixedT, useSettingModified } from '~demo/hooks';

export default function Settings() {
  const [at, nt] = useFixedT('app', 'nav');
  const modified = useSettingModified();

  return (
    <PageContainer maxWidth="xs" title={nt('ttl-settings')}>
      <TextField
        fullWidth
        select
        variant="outlined"
        size="small"
        margin="normal"
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
    </PageContainer>
  );
}
