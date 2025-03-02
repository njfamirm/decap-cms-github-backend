import {NanotronApiServer} from '@alwatr/nanotron';

import {config} from '../config.js';

export const apiServer = new NanotronApiServer(config.nanoServer);
