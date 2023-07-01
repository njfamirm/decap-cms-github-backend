import {IncomingMessage, ServerResponse} from 'http';
import {AuthorizationCode} from 'simple-oauth2';
import {config} from '../config.js';

export default async (req: IncomingMessage, res: ServerResponse) => {
  const {host} = req.headers;
  const url = new URL(`https://${host}/${req.url}`);
  const code = url.searchParams.get('code');
  const provider = url.searchParams.get('provider');

  if (provider !== 'github') {
    res.statusCode = 400;
    res.end(renderBody('error'));
    // res.end('invalid provider');
  }

  if (!code) {
    res.statusCode = 400;
    res.end(renderBody('error'));
    return;
  }

  const client = new AuthorizationCode(config);
  const tokenParams = {
    code,
    redirect_uri: `https://${host}/callback?provider=${provider}`,
  };

  const accessToken = await client.getToken(tokenParams);
  const token = accessToken.token['access_token'] as string;

  const responseBody = renderBody('success', token);

  res.statusCode = 200;
  res.end(responseBody);
};

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
