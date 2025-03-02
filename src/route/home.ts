import {apiServer} from '../lib/api-server.js';

apiServer.defineRoute({
  method: 'GET',
  url: '/',
  handler: function () {
    this.serverResponse.replyJson({
      ok: true,
      data: {
        app: '..:: Decap CMS Backend Microservice ::..',
        message: 'Hello',
      },
    });
  },
});
