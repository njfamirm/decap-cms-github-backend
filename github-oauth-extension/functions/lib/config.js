"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.config = void 0;
const logger_1 = require("@alwatr/logger");
// Get configuration from Firebase environment
const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
const scope = process.env.OAUTH_GITHUB_SCOPE || 'repo'; // Keep the default for scope if not provided
// Validate required configuration
if (clientId == undefined) {
    throw new Error('GitHub client ID required. Set using Firebase Functions config.');
}
if (clientSecret == undefined) {
    throw new Error('GitHub client secret required. Set using Firebase Functions config.');
}
exports.config = {
    client: {
        id: clientId,
        secret: clientSecret,
    },
    scope: scope,
    auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize',
    }
};
exports.logger = (0, logger_1.createLogger)('decap-cms-backend');
exports.logger.logProperty?.('config', {
    client: { id: clientId },
    scope: scope,
    auth: exports.config.auth
});
//# sourceMappingURL=config.js.map