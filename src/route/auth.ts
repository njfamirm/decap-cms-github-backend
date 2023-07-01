import {AuthorizationCode} from 'simple-oauth2';
import {randomBytes} from 'crypto';
import {nanoServer} from '../lib/nano-server.js';
import {config} from '../config.js';

export const randomString = () => randomBytes(4).toString('hex');

nanoServer.route('GET', '/auth', (connection) => {
  const host = connection.incomingMessage.headers.host;
  const url = new URL(`https://${host}/${connection.url}`);
  const provider = url.searchParams.get('provider');

  if (provider !== 'github') {
    return {
      ok: false,
      errorCode: 'invalid_provider',
      statusCode: 400,
    };
  }

  const client = new AuthorizationCode({
    client: config.client,
    auth: config.auth,
  });

  const authorizationUri = client.authorizeURL({
    redirect_uri: `https://${host}/callback?provider=${provider}`,
    scope: 'repo,user',
    state: randomString(),
  });

  connection.serverResponse.writeHead(301, { Location: authorizationUri });
  return {
    ok: true,
    data: {},
  };
});
