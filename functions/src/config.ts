import { createLogger } from '@alwatr/logger';

// Get configuration from Firebase environment
const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
const scope = process.env.OAUTH_GITHUB_SCOPE || 'repo'; // Keep the default for scope if not provided

// Validate required configuration
if (clientId == undefined) {
  throw new Error('GitHub client ID required. Set using Firebase Functions config.');
}
if (clientSecret == undefined) {
  throw new Error('GitHub client secret required. Set using Firebase Functions config.');
}

export const config = {
  client: {
    id: clientId as string,
    secret: clientSecret as string,
  },
  scope: scope,
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  }
};

export const logger = createLogger('decap-cms-backend');

logger.logProperty?.('config', { 
  client: { id: clientId }, 
  scope: scope,
  auth: config.auth
});
