import { OAuth2Client } from 'google-auth-library';

export const client = new OAuth2Client(
  __WEBPACK_DEFINE__.GOOGLE_CLIENT_ID,
  __WEBPACK_DEFINE__.GOOGLE_CLIENT_SECRET,
  __WEBPACK_DEFINE__.GOOGLE_REDIRECT_URI
);
