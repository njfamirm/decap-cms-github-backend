import { logger } from './config';

// Import and export all functions
export { auth } from './auth';
export { callback } from './callback';

// Log startup
logger.logOther?.('..:: Alwatr Decap CMS Backend Firebase Functions ::..');
