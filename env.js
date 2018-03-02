// @flow
// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

import fs from 'fs';

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

const paths = {
  dotenv: '.env',
};

const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' ? `${paths.dotenv}.local` : '',
  paths.dotenv,
].filter(file => file !== '');

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({ // eslint-disable-line global-require, import/no-extraneous-dependencies
      path: dotenvFile,
    });
  }
});

const REACT_APP = /^REACT_APP_/i;

const getClientEnvironment = () => {
  const penv = ((process.env: any): {[string]: string});

  const raw = Object.keys(penv)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key]; // eslint-disable-line no-param-reassign
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    });

  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]); // eslint-disable-line no-param-reassign
      return env;
    }, {}),
  };

  return { raw, stringified };
};

export default getClientEnvironment;
