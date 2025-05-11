import * as functions from 'firebase-functions';
import { AuthorizationCode } from 'simple-oauth2';
import { config, logger } from './config';

export const callback = functions.https.onRequest(async (request, response) => {
  if (request.method !== 'GET') {
    response.status(405).send('Method Not Allowed');
    return;
  }

  const host = request.headers.host;
  const url = new URL(`https://${host}${request.originalUrl}`);
  const provider = url.searchParams.get('provider');
  const code = url.searchParams.get('code');
  
  logger.logMethodArgs?.('get-callback', { host, url, provider });

  if (provider !== 'github') {
    response.status(400).json({
      ok: false,
      errorCode: 'invalid_provider',
    });
    return;
  }

  if (!code) {
    response.status(400).json({
      ok: false,
      errorCode: 'require_code',
    });
    return;
  }

  try {
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

    response.send(renderBody('success', token));
    return;
  } 
  catch (error) {
    response.send(renderBody('error'));
    return;
  }
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
