import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: '..:: Decap CMS Backend Microservice ::..',
    message: 'Hello',
  },
}));
