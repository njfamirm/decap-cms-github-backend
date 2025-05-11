import * as functions from 'firebase-functions';
import { logger } from './config';

export const home = functions.https.onRequest((request, response) => {
  logger.logOther?.('Home endpoint called');
  
  response.status(200).json({
    ok: true,
    data: {
      app: '..:: Decap CMS Backend Firebase Function ::..',
      message: 'Hello',
    },
  });
});
