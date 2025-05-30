"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = void 0;
const functions = __importStar(require("firebase-functions"));
const simple_oauth2_1 = require("simple-oauth2");
const config_1 = require("./config");
exports.callback = functions.https.onRequest(async (request, response) => {
    if (request.method !== 'GET') {
        response.status(405).send('Method Not Allowed');
        return;
    }
    const host = request.headers.host;
    const url = new URL(`https://${host}${request.originalUrl}`);
    const provider = url.searchParams.get('provider');
    const code = url.searchParams.get('code');
    config_1.logger.logMethodArgs?.('get-callback', { host, url, provider });
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
        const client = new simple_oauth2_1.AuthorizationCode({
            auth: config_1.config.auth,
            client: config_1.config.client,
        });
        const tokenParams = {
            code,
            redirect_uri: `https://${host}/callback?provider=${provider}`,
        };
        const accessToken = await client.getToken(tokenParams);
        const token = accessToken.token['access_token'];
        console.log('accessToken %o', accessToken.token);
        response.send(renderBody('success', token));
        return;
    }
    catch (error) {
        response.send(renderBody('error'));
        return;
    }
});
function renderBody(status, token) {
    const content = {
        token: token,
        provider: 'github',
    };
    return `<!doctype html><html><body><script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e)
      window.opener.postMessage(
        'authorization:github:${status}:${JSON.stringify(content)}',
        e.origin
      )
    }
    window.addEventListener("message", receiveMessage, false)
    console.log("Sending message: %o", "github")
    window.opener.postMessage("authorizing:github", "*")
    })()
  </script></body></html>`;
}
//# sourceMappingURL=callback.js.map