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
exports.lifecycletaskonconfigure = exports.lifecycletaskonupdate = exports.lifecycletaskoninstall = exports.callback = exports.auth = void 0;
const functions = __importStar(require("firebase-functions")); // Add this import
const config_1 = require("./config");
// Import and export all functions
var auth_1 = require("./auth");
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return auth_1.auth; } });
var callback_1 = require("./callback");
Object.defineProperty(exports, "callback", { enumerable: true, get: function () { return callback_1.callback; } });
// Log startup
config_1.logger.logOther?.('..:: Alwatr Decap CMS Backend Firebase Functions ::..');
// Lifecycle Hooks (Placeholders)
// These will be triggered by Pub/Sub events specified in extension.yaml
exports.lifecycletaskoninstall = functions.pubsub.topic('firebase-extensions-lifecycle-oninstall').onPublish(async (message) => {
    config_1.logger.logOther?.('onInstall lifecycle hook triggered (placeholder)', { message });
    // Add any on-install logic here in the future
});
exports.lifecycletaskonupdate = functions.pubsub.topic('firebase-extensions-lifecycle-onupdate').onPublish(async (message) => {
    config_1.logger.logOther?.('onUpdate lifecycle hook triggered (placeholder)', { message });
    // Add any on-update logic here in the future (e.g., data migration)
});
exports.lifecycletaskonconfigure = functions.pubsub.topic('firebase-extensions-lifecycle-onconfigure').onPublish(async (message) => {
    config_1.logger.logOther?.('onConfigure lifecycle hook triggered (placeholder)', { message });
    // Add any on-configuration logic here in the future (e.g., revalidating settings)
});
//# sourceMappingURL=index.js.map