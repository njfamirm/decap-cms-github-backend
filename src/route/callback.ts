import { AuthorizationCode } from 'simple-oauth2';
import { config, logger } from '../config.js';
import { apiServer } from '../lib/api-server.js';

apiServer.defineRoute({
  method: 'GET',
  url: '/callback',
  handler: async function () {
    const host = this.headers.host;
    const url = new URL(`https://${host}/${this.url}`);
    const provider = url.searchParams.get('provider');
    const code = url.searchParams.get('code');
    logger.logMethodArgs?.('get-callback', { host, url, provider });

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

    const client = new AuthorizationCode({
      auth: config.auth,
      client: config.client,
    });
    const tokenParams = {
      code,
      redirect_uri: `https://${host}/callback?provider=${provider}`,
    };

    const accessToken = await client.getToken(tokenParams);
    const token = accessToken.token['access_token'] as string;

    this.serverResponse.reply(renderBody('success', token));

    return {
      ok: true,
      data: {},
    };
  },
});

function renderBody(status: string, token?: string) {
  return `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify({ token })}',
          message.origin
        );

        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);

      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
}
