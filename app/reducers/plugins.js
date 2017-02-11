const plugins = (state = { }, action) => {
  switch (action.type) {
    // case 'AUTH_SET_TOKENS':
    //   return {
    //     ...state,
    //     ...action.token,
    //   };
    default:
      return state;
  }
};

export default plugins;

// export const getToken = state => state.auth;

// const setupPlugin = (iot) => {
//   log.debug('setting up plugins');

  // const plugins = config.get('plugins');
  // if (plugins.length !== 1) {
  //   debug('plugin setup error');
  //   debug(plugins);
  //   throw new Error('Semi configured system');
  // }

  // const newPlugins = [
  //   {
  //     packagePath: 'hubber-iot',
  //     ...iot,
  //   },
  //   'hubber-plugins',
  // ];

  // config.set('plugins', newPlugins);
  // };
