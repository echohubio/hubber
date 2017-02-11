import electronOauth2 from 'electron-oauth2';

const config = {
  clientId: 'hubber',
  clientSecret: '15a3ba899397432aace0f776499c6a2f',
  authorizationUrl: 'https://www.echohub.io/alexa/link',
  tokenUrl: 'https://www.echohub.io/api/oauth2/token',
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
