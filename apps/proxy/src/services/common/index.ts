import { clients, getClientMode } from './OAuth2Client';

export { clients, getClientMode };
export type OAuth2ClientMode = ReturnType<typeof getClientMode>;
