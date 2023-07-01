import { IncomingMessage, ServerResponse } from "http";
import { AuthorizationCode } from "simple-oauth2";
import { randomBytes } from "crypto";
import { config } from "../config.js";

export const randomString = () => randomBytes(4).toString("hex");

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { host } = req.headers;
  const url = new URL(`https://${host}/${req.url}`);
  const urlParams = url.searchParams;
  const provider = urlParams.get("provider");

  const client = new AuthorizationCode(config);

  const authorizationUri = client.authorizeURL({
    redirect_uri: `https://${host}/callback?provider=${provider}`,
    scope: 'repo,user',
    state: randomString(),
  });

  res.writeHead(301, { Location: authorizationUri });
  res.end();
};
