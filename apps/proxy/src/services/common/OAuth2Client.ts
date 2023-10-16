import { OAuth2Client } from 'google-auth-library';

export default {
  dev: new OAuth2Client(
    __WEBPACK_DEFINE__.GOOGLE_CLIENT_ID,
    __WEBPACK_DEFINE__.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/api/oauth2/google/callback'
  ),
  prod: new OAuth2Client(
    __WEBPACK_DEFINE__.GOOGLE_CLIENT_ID,
    __WEBPACK_DEFINE__.GOOGLE_CLIENT_SECRET,
    __WEBPACK_DEFINE__.GOOGLE_REDIRECT_URI
  ),
};
