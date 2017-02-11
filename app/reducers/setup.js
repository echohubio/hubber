const setup = (state = { connected: false, authenticated: false, finalised: false }, action) => {
  switch (action.type) {
    case 'SETUP_SET_CONNECTED':
      return {
        ...state,
        connected: true,
      };
    case 'SETUP_SET_AUTHENTICATED':
      return {
        ...state,
        authenticated: true,
      };
    case 'SETUP_SET_FINALISED':
      return {
        ...state,
        finalised: true,
      };
    default:
      return state;
  }
};

export default setup;

export const getConnected = state => state.setup.connected;
export const getAuthenticated = state => state.setup.authenticated;
export const getFinalised = state => state.setup.finalised;
