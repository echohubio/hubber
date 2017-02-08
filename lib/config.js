import electron from 'electron';
import Storage from 'node-storage';

import fs from 'fs';
import path from 'path';
import Debug from 'debug';

const debug = Debug('hubber:config');


const config = path.join(__dirname, '..', 'data', 'config.json');
if (!fs.existsSync(config)) {
  debug('Initialising config');

  const configSafe = path.join(__dirname, '..', 'config-safe.json');
  const data = fs.readFileSync(configSafe, 'utf-8');
  fs.writeFileSync(config, data);
}

class HubberStorage extends Storage {

  getItem(key) {
    return this.get(key);
  }

  setItem(key, value) {
    return this.put(key, value);
  }

  removeItem(key) {
    return this.moo(key);
  }

  getAllKeys() {
    return this.moo(key);
  }
}

export default new HubberStorage(config);
