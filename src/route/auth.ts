import { AuthorizationCode } from 'simple-oauth2';
import { randomBytes } from 'crypto';
import { apiServer } from '../lib/api-server.js';
import { config, logger } from '../config.js';

export const randomString = () => randomBytes(4).toString('hex');

apiServer.defineRoute({
  method: 'GET',
  url: '/auth',
  handler: function () {
    const host = this.headers.host;
    const url = new URL(`https://${host}/${this.url}`);
    const provider = url.searchParams.get('provider');
    logger.logMethodArgs?.('get-auth', { host, url, provider });

    if (provider !== 'github') {
      return {
        ok: false,
        statusCode: 400,
        errorCode: 'invalid_provider',
      };
    }

    const client = new AuthorizationCode({
      client: config.client,
      auth: config.auth,
    });

    const authorizationUri = client.authorizeURL({
      redirect_uri: `https://${host}/callback?provider=${provider}`,
      scope: config.scope,
      state: randomString(),
    });

    logger.logProperty?.('authorizationUri', authorizationUri);

    this.serverResponse.raw_.setHeader('Location', authorizationUri);
    return {
      ok: true,
      statusCode: 301,
      data: {},
    };
  },
});
