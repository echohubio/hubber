const auth = (state = { }, action) => {
  switch (action.type) {
    case 'AUTH_SET_TOKENS':
      return {
        ...state,
        ...action.token,
      };
    default:
      return state;
  }
};

export default auth;

export const getToken = state => state.auth;
export const getAccessToken = state => state.auth.access_token;
export const getRefreshToken = state => state.auth.refresh_token;
