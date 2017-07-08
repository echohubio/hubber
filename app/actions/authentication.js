import electronOauth2 from 'electron-oauth2';

const config = {
  clientId: 'io.echohub.hubber',
  clientSecret: 'd659c658-0b48-4836-a793-a2f9a6fd71d4',
  authorizationUrl: 'https://www.echohub.io/alexa/link',
  tokenUrl: 'https://api.echohub.io/oauth2/token',
};

export const authenticate = () => (dispatch) => {
  const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
    },
  };

  const options = {
    scope: ['read', 'write'],
  };

  const myApiOauth = electronOauth2(config, windowParams);

  myApiOauth.getAccessToken(options)
    .then((token) => {
      dispatch({
        type: 'SETUP_SET_AUTHENTICATED',
      });

      dispatch({
        type: 'AUTH_SET_TOKENS',
        token,
      });

      // TODO: use for refresh
      // myApiOauth.refreshToken(token.refresh_token)
      //   .then(newToken => {
      //     //use your new token
      //   });
    });
};

export const dummy = 'foo';
