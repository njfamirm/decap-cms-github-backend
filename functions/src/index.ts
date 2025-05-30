import * as functions from 'firebase-functions'; // Add this import
import { logger } from './config';

// Import and export all functions
export { auth } from './auth';
export { callback } from './callback';

// Log startup
logger.logOther?.('..:: Alwatr Decap CMS Backend Firebase Functions ::..');

// Lifecycle Hooks (Placeholders)
// These will be triggered by Pub/Sub events specified in extension.yaml

export const lifecycletaskoninstall = functions.pubsub.topic('firebase-extensions-lifecycle-oninstall').onPublish(async (message: functions.pubsub.Message) => {
  logger.logOther?.('onInstall lifecycle hook triggered (placeholder)', { message });
  // Add any on-install logic here in the future
});

export const lifecycletaskonupdate = functions.pubsub.topic('firebase-extensions-lifecycle-onupdate').onPublish(async (message: functions.pubsub.Message) => {
  logger.logOther?.('onUpdate lifecycle hook triggered (placeholder)', { message });
  // Add any on-update logic here in the future (e.g., data migration)
});

export const lifecycletaskonconfigure = functions.pubsub.topic('firebase-extensions-lifecycle-onconfigure').onPublish(async (message: functions.pubsub.Message) => {
  logger.logOther?.('onConfigure lifecycle hook triggered (placeholder)', { message });
  // Add any on-configuration logic here in the future (e.g., revalidating settings)
});
