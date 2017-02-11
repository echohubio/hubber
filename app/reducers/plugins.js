const plugins = (state = [], action) => {
  switch (action.type) {
    case 'PLUGINS_INITIALISE':
      return [
        ...state,
        ...action.plugins,
      ];
    default:
      return state;
  }
};

export default plugins;

