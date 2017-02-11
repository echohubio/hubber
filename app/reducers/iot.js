const iot = (state = { }, action) => {
  switch (action.type) {
    case 'IOT_SET_CERTS':
      return {
        ...state,
        ...action.iot,
      };
    default:
      return state;
  }
};

export default iot;

// export const getToken = state => state.auth;
