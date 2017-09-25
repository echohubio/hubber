// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

const REACT_APP = /^REACT_APP_/i;

const getClientEnvironment = () => {
  const processEnv = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]); // eslint-disable-line no-param-reassign
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
      REACT_APP_API_URL: JSON.stringify(
        process.env.REACT_APP_API_URL || 'https://api.staging.echohub.io',
      ),
      REACT_APP_WWW_URL: JSON.stringify(
        process.env.REACT_APP_WWW_URL || 'https://www.staging.echohub.io',
      ),
      COGNITO_POOL_ID: JSON.stringify(
        process.env.COGNITO_POOL_ID,
      ),
      COGNITO_CLIENT_ID: JSON.stringify(
        process.env.COGNITO_CLIENT_ID,
      ),
    });
  return { 'process.env': processEnv };
};

export default getClientEnvironment;
