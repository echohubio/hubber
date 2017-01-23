import fs from 'fs';
import path from 'path';
import Storage from 'node-storage';
import Debug from 'debug';

const debug = Debug('hubber:config');

const config = path.join(__dirname, '..', 'data', 'config.json');
if (!fs.existsSync(config)) {
  debug('Initialising config');

  const configSafe = path.join(__dirname, '..', 'config-safe.json');
  const data = fs.readFileSync(configSafe, 'utf-8');
  fs.writeFileSync(config, data);
}

const store = new Storage(config);

export const get = key => store.get(key);

export const set = (name, value) => store.put(name, value);
