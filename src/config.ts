import { createLogger } from "@alwatr/logger";

const clientId = process.env.OAUTH_GITHUB_CLIENT_ID
const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET

if (clientId == undefined) {
  throw new Error('github client id required, OAUTH_GITHUB_CLIENT_ID="123_123_123" yarn start');
}
if (clientSecret == undefined) {
  throw new Error('github client secret required, OAUTH_GITHUB_CLIENT_SECRET="123_123_123" yarn start');
}

export const config = {
  client: {
    id: clientId as string,
    secret: clientSecret as string,
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  },
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8000,
  },
};

export const logger = createLogger('decap-cms-backend')

logger.logProperty?.('config', config)
