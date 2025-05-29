import * as functions from 'firebase-functions';
import { AuthorizationCode } from 'simple-oauth2';
import { randomBytes } from 'crypto';
import { config, logger } from './config';

const randomString = () => randomBytes(4).toString('hex');

export const auth = functions.https.onRequest((request, response) => {
  if (request.method !== 'GET') {
    response.status(405).send('Method Not Allowed');
    return;
  }

  const host = request.headers.host;
  const url = new URL(`https://${host}${request.originalUrl}`);
  const provider = url.searchParams.get('provider');
  
  logger.logMethodArgs?.('get-auth', { host, url, provider });

  if (provider !== 'github') {
    response.status(400).json({
      ok: false,
      errorCode: 'invalid_provider',
    });
    return;
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

  response.redirect(301, authorizationUri);
});
