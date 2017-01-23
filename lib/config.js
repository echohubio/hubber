import fs from 'fs';
import path from 'path';
import Storage from 'node-storage';
import Debug from 'debug';

const debug = Debug('hubber:config');

let config = path.join(__dirname, '..', 'data', 'config.json');
if (!fs.existsSync(config)) {
  debug('Starting in safe mode');
  config = path.join(__dirname, '..', 'config-safe.json');
}

const store = new Storage(config);

export default store;
