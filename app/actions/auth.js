// @flow
import electronOauth2 from 'electron-oauth2';

import type { AuthTokenType } from '../types/actions';
import type { Dispatch } from '../types/state';

import { setAuthenticated } from '../actions/setup';

export const AUTH_SET_TOKENS = 'AUTH_SET_TOKENS';

export function setTokens(token: AuthTokenType) {
  return {
    type: AUTH_SET_TOKENS,
    token,
  };
}

const clientSecret = process.env.NODE_ENV === 'production' ? 'd659c658-0b48-4836-a793-a2f9a6fd71d4' : '6d859f7e-1fe4-4349-8954-8809276cdc50';

if (!process.env.REACT_APP_API_URL) {
  throw new Error('REACT_APP_API_URL is missing');
}

if (!process.env.REACT_APP_WWW_URL) {
  throw new Error('REACT_APP_WWW_URL is missing');
}
const config = {
  clientId: 'io.echohub.hubber',
  clientSecret,
  authorizationUrl: `${process.env.REACT_APP_WWW_URL}/alexa/link`,
  tokenUrl: `${process.env.REACT_APP_API_URL}/oauth2/token`,
};

export const authenticate = () => (dispatch: Dispatch) => {
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

  return myApiOauth.getAccessToken(options)
    .then((tokens) => {
      dispatch(setAuthenticated());
      return dispatch(setTokens(tokens));

      // TODO: use for refresh
      // myApiOauth.refreshToken(token.refresh_token)
      //   .then(newToken => {
      //     //use your new token
      //   });
    });
};

export const dummy = 'foo';
