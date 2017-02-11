const plugins = (state = [], action) => {
  switch (action.type) {
    case 'PLUGINS_INITIALISE':
      return [
        ...state,
        ...action.plugins,
      ];
    case 'PLUGINS_ADD':
      return [
        ...state,
        action.name,
      ];
    default:
      return state;
  }
};

export default plugins;

