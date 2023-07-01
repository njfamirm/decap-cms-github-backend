import {AuthorizationCode} from 'simple-oauth2';
import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js'

nanoServer.route('GET', '/callback', async (connection) => {
  const host = connection.incomingMessage.headers.host;
  const url = new URL(`https://${host}/${connection.url}`);
  const provider = url.searchParams.get('provider');
  const code = url.searchParams.get('code');
  logger.logMethodArgs?.('get-callback', {host, url, provider})

  if (provider !== 'github') {
    return {
      ok: false,
      statusCode: 400,
      errorCode: 'invalid_provider',
    };
  }

  if (!code) {
    return {
      ok: false,
      statusCode: 400,
      errorCode: 'require_code',
    };
  }

  const client = new AuthorizationCode({auth: config.auth, client: config.client});
  const tokenParams = {
    code,
    redirect_uri: `https://${host}/callback?provider=${provider}`,
  };

  const accessToken = await client.getToken(tokenParams);
  const token = accessToken.token['access_token'] as string;

  connection.serverResponse.end(renderBody('success', token))

  return {
    ok: true,
    data: {},
  };
});

function renderBody(status: string, token?: string) {
  return `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify({token})}',
          message.origin
        );

        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);

      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
}
